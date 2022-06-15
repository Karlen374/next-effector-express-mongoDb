import { createStore, createEffect, createEvent } from 'effector';
import { getLocalStorage } from '../../hooks/hooks';
import { ILoginForm } from '../../types/ILoginForm';
import { IRegistrationForm } from '../../types/IRegistrationForm';
import { IUser } from '../../types/IUser';
import { request } from '../../hooks/useHttp';

export const userRegistration = createEffect(async (data:IRegistrationForm) => {
  const res = await request('http://localhost:5000/auth/registration', 'POST', JSON.stringify(data));
  return res;
});

export const checkRegistrationMessage = createEvent<string>('');

userRegistration.doneData.watch(() => {
  checkRegistrationMessage('success');
  setTimeout(() => {
    checkRegistrationMessage('');
  }, 2000);
});

userRegistration.failData.watch(() => {
  checkRegistrationMessage('error');
  setTimeout(() => {
    checkRegistrationMessage('');
  }, 2000);
});

export const $registrationMessage = createStore<string>('')
  .on(checkRegistrationMessage, (_, message) => message);

export const userLogin = createEffect(async (data:ILoginForm) => {
  const res = await request('http://localhost:5000/auth/login', 'POST', JSON.stringify(data));
  return res;
});

export const checkLoginMessage = createEvent<string>('');

userLogin.doneData.watch(() => {
  checkLoginMessage('success');
  setTimeout(() => {
    checkLoginMessage('');
  }, 2000);
});

userLogin.failData.watch(() => {
  checkLoginMessage('error');
  setTimeout(() => {
    checkLoginMessage('');
  }, 2000);
});

export const $loginMessage = createStore<string>('')
  .on(checkLoginMessage, (_, message) => message);

export const uploadUserAvatar = createEffect(async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const headers = {
    Authorization: `Bearer ${JSON.parse(getLocalStorage()?.getItem('data')).token}`,
  };
  const res = await request('http://localhost:5000/static/avatar', 'POST', formData, headers);
  return res;
});

export const loadUserData = createEvent<void>();
export const clearUserData = createEvent<void>();

export const $userData = createStore<IUser>(null)
  .on(userLogin.doneData, (_, user) => {
    getLocalStorage()?.setItem('data', JSON.stringify(user));
    return user;
  })
  .on(uploadUserAvatar.doneData, (_, user) => {
    getLocalStorage()?.setItem('data', JSON.stringify(user));
    return user;
  })
  .on(loadUserData, () => JSON.parse(getLocalStorage()?.getItem('data')))

  .on(clearUserData, () => {
    getLocalStorage()?.removeItem('data');
    return null;
  });
