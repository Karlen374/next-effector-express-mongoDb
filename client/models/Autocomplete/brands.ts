import { createStore, createEffect } from 'effector';
import { IBrands } from '../../types/IBrands';
import { useHttp } from '../../hooks/useHttp';

const apiBaseBrands = 'http://localhost:5000/api/brands';
const { request } = useHttp();

export const getBrandsForAutocomplete = createEffect(async (inputText:string) => {
  const body = {
    text: inputText,
  };
  const res = await request(apiBaseBrands, 'PUT', JSON.stringify(body));
  return res;
});

export const addNewBrandInAutocomplete = createEffect(async (newBrand:string) => {
  const body = {
    brand: newBrand,
  };
  const res = await request(apiBaseBrands, 'POST', JSON.stringify(body));
  return res;
});

export const $brands = createStore<IBrands[]>([])
  .on(getBrandsForAutocomplete.doneData, (_, newBrands) => newBrands)

  .on(addNewBrandInAutocomplete.doneData, (brands, newBrand) => [...brands, newBrand]);
