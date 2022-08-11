import { createEvent, createStore } from 'effector';

export const changeApiErrorStatus = createEvent<boolean>();

export const $apiErrorAlert = createStore<boolean>(false)
  .on(changeApiErrorStatus, (_, pending) => pending);
