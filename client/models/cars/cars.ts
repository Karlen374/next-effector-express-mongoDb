import { createEvent, createStore, createEffect } from 'effector';
import { ICar } from '../../types/ICar';

export const addCar = createEffect(async (car:ICar) => {
  const url = 'http://localhost:5000/api/cars';
  const req = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return req.json();
});

export const checkPendingError = createEvent<boolean>();

export const $Alert = createStore<boolean>(false)
  .on(checkPendingError, (_, pending) => pending);

addCar.failData.watch(() => {
  checkPendingError(true);
  setTimeout(() => {
    checkPendingError(false);
  }, 2000);
});

export const pendingData = createEvent<boolean>();

export const $Loader = createStore<boolean>(false)
  .on(pendingData, (_, pending) => pending);

addCar.pending.watch((pending) => {
  pendingData(pending);
});

export const saveEditCar = createEffect(async (editCar:ICar) => {
  const url = 'http://localhost:5000/api/cars';
  const req = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ ...editCar, _id: editCar.id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return req.json();
});

saveEditCar.pending.watch((pending) => {
  pendingData(pending);
});

saveEditCar.failData.watch(() => {
  checkPendingError(true);
  setTimeout(() => {
    checkPendingError(false);
  }, 2000);
});

export const changeLiked = createEffect(async (id:string) => {
  const url = 'http://localhost:5000/api/carLike';
  const req = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      _id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return req.json();
});

export const changeViewedCar = createEffect(async (id:string) => {
  const url = 'http://localhost:5000/api/carViewed';
  const req = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      _id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return req.json();
});

export const loadCars = createEvent<ICar[]>();

export const $cars = createStore<ICar[]>([])
  .on(loadCars, (_, carsFromApi:ICar[]) => {
    return carsFromApi;
  })

  .on(saveEditCar.doneData, (cars, editCar) => {
    const data = cars.map((item) => {
      if (item.id === editCar.id) {
        return editCar;
      } else return item;
    });
    return data;
  })

  .on(addCar.doneData, (cars, newCar) => {
    return [...cars, newCar];
  })

  .on(changeLiked.doneData, (cars, likeCar) => {
    const data = cars.map((item) => {
      if (item.id === likeCar.id) {
        return likeCar;
      } else return item;
    });
    return data;
  })

  .on(changeViewedCar.doneData, (cars, viewedCar) => {
    const data = cars.map((item) => {
      if (item.id === viewedCar.id) {
        return viewedCar;
      } else return item;
    });
    return data;
  });
