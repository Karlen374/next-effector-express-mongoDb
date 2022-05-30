import { createStore, createEvent } from 'effector';

export const changeViewedModal = createEvent<void>();

export const $modal = createStore<boolean>(false)
  .on(changeViewedModal, (modal) => !modal);
