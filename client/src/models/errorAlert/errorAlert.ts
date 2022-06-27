import { createEvent, createStore } from 'effector';
import { addCar, saveEditCar } from 'src/models/cars/cars';

export const checkPendingError = createEvent<boolean>();

addCar.failData.watch(() => {
  checkPendingError(true);
  setTimeout(() => {
    checkPendingError(false);
  }, 2000);
});

saveEditCar.failData.watch(() => {
  checkPendingError(true);
  setTimeout(() => {
    checkPendingError(false);
  }, 2000);
});

export const $Alert = createStore<boolean>(false)
  .on(checkPendingError, (_, pending) => pending);
