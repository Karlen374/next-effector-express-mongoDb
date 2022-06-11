import { createStore, createEffect } from 'effector';
import { getLocalStorage } from '../../hooks/hooks';
import { request } from '../../hooks/useHttp';
import { AdminPanelProps } from '../../pages/adminPanel';

export const getUsers = createEffect(async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(getLocalStorage()?.getItem('data')).token}`,
  };
  const res = await request('http://localhost:5000/auth/users', 'GET', null, headers);
  return res;
});

export const $allUsers = createStore<AdminPanelProps[]>([])
  .on(getUsers.doneData, (_, users) => users);
