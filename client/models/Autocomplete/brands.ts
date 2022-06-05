import { createStore, createEffect } from 'effector';
import { IBrands } from '../../types/IBrands';
import useAutocompleteServices from '../../services/getAutocompleteServices';

export const getBrandsForAutocomplete = createEffect(async (inputText:string) => {
  const { getBrandsAutocomplete } = useAutocompleteServices();
  const response = await getBrandsAutocomplete(inputText);
  return response;
});

export const addNewBrandInAutocomplete = createEffect(async (newBrand:string) => {
  const { addNewBrand } = useAutocompleteServices();
  const response = await addNewBrand(newBrand);
  return response;
});

export const $brands = createStore<IBrands[]>([])
  .on(getBrandsForAutocomplete.doneData, (_, newBrands) => newBrands)

  .on(addNewBrandInAutocomplete.doneData, (brands, newBrand) => [...brands, newBrand]);
