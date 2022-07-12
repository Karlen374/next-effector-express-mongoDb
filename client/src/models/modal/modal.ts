import { createStore, createEvent } from 'effector';

export const changeAddFormViewedModal = createEvent<boolean>();

export const $advertisementModal = createStore<boolean>(false)
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

export const changeChatModal = createEvent<boolean>();

export const $chatModal = createStore<boolean>(false)
  .on(changeChatModal, (_, modal) => modal);

export const changeConfirmModal = createEvent<boolean>();

export const $confirmModal = createStore<boolean>(false)
  .on(changeConfirmModal, (_, modal) => modal);
