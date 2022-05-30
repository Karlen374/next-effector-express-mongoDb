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

export const pendingData = createEvent<boolean>();

export const $Loader = createStore(false)
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
    return [...cars, editCar];
  })
  .on(addCar.doneData, (cars, newCar) => {
    return [...cars, newCar];
  })

  .on(changeLiked.doneData, (cars, likeCar) => {
    return [...cars, likeCar];
  })

  .on(changeViewedCar.doneData, (cars, viewedCar) => {
    return [...cars, viewedCar];
  });
