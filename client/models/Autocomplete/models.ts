import { createStore, createEffect } from 'effector';
import { IModels } from '../../types/iModels';
import useAutocompleteServices from '../../services/getAutocompleteServices';

export const getModelsForAutocomplete = createEffect(async (inputText:string) => {
  const { getModelsAutocomplete } = useAutocompleteServices();
  const response = await getModelsAutocomplete(inputText);
  return response;
});

export const addNewModelInAutocomplete = createEffect(async (newModel:string) => {
  const { addNewModel } = useAutocompleteServices();
  const response = await addNewModel(newModel);
  return response;
});

export const $models = createStore<IModels[]>([])
  .on(getModelsForAutocomplete.doneData, (_, newModels) => newModels)

  .on(addNewModelInAutocomplete.doneData, (models, newModel) => [...models, newModel]);
