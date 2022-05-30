import { createEvent, createStore } from 'effector';
import { ICar } from '../../types/ICar';

export const selectEditCar = createEvent<ICar>();
export const setSelectEditCar = createEvent<void>();

export const $selectedCar = createStore<ICar>(null)
  .on(selectEditCar, (selectedCar, car) => {
    return car;
  })
  .reset(setSelectEditCar);
