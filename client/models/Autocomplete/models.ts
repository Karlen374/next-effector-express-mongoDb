import { createStore, createEffect } from 'effector';
import { IModels } from '../../types/iModels';
import { useHttp } from '../../hooks/useHttp';

const apiBase = 'http://localhost:5000/api/models';
const { request } = useHttp();

export const getModelsForAutocomplete = createEffect(async (inputText:string) => {
  const body = {
    text: inputText,
  };
  const res = await request(apiBase, 'PUT', JSON.stringify(body));
  return res;
});

export const addNewModelInAutocomplete = createEffect(async (newModel:string) => {
  const body = {
    model: newModel,
  };
  const res = await request(apiBase, 'POST', JSON.stringify(body));
  return res;
});

export const $models = createStore<IModels[]>([])
  .on(getModelsForAutocomplete.doneData, (_, newModels) => newModels)

  .on(addNewModelInAutocomplete.doneData, (models, newModel) => [...models, newModel]);
