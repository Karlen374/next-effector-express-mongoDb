import { createStore, createEvent } from 'effector';

export const changeAddFormViewedModal = createEvent<boolean>();

export const $modal = createStore<boolean>(false)
  .on(changeAddFormViewedModal, (_, modal) => modal);

export const changeLoginFormViewedModal = createEvent<boolean>();

export const $loginModal = createStore<boolean>(false)
  .on(changeLoginFormViewedModal, (_, loginModal) => loginModal);

export const changeRegistrationFormViewedModal = createEvent<boolean>();

export const $registrationModal = createStore<boolean>(false)
  .on(changeRegistrationFormViewedModal, (_, registrationModal) => registrationModal);

export const carPhotoUploadModal = createEvent<boolean>();

export const $carUpload = createStore<boolean>(false)
  .on(carPhotoUploadModal, (_, modal) => modal);
