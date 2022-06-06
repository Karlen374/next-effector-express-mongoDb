import { createEvent, createStore, createEffect } from 'effector';
import { ICar } from '../../types/ICar';
import { useHttp } from '../../hooks/useHttp';

const apiBase = 'http://localhost:5000/api/cars';
const { request } = useHttp();

export const addCar = createEffect(async (car:ICar) => {
  const res = await request(apiBase, 'POST', JSON.stringify(car));
  return res;
});

export const saveEditCar = createEffect(async (editCar:ICar) => {
  const res = await request(apiBase, 'PUT', JSON.stringify({ ...editCar, _id: editCar.id }));
  return res;
});

export const changeLiked = createEffect(async (id:string) => {
  const url = 'http://localhost:5000/api/carLike';
  const res = await request(url, 'PUT', JSON.stringify({ _id: id }));
  return res;
});

export const changeViewedCar = createEffect(async (id:string) => {
  const url = 'http://localhost:5000/api/carViewed';
  const res = await request(url, 'PUT', JSON.stringify({ _id: id }));
  return res;
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
