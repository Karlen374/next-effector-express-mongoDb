import { useHttp } from '../hooks/useHttp';

const useAutocompleteServices = () => {
  const apiBaseModel = 'http://localhost:5000/api/models';
  const apiBaseBrands = 'http://localhost:5000/api/brands';
  const { request } = useHttp();

  const getModelsAutocomplete = async (inputText:string) => {
    const body = {
      text: inputText,
    };
    const res = await request(apiBaseModel, 'PUT', JSON.stringify(body));
    return res;
  };
  const addNewModel = async (newModel:string) => {
    const body = {
      model: newModel,
    };
    const res = await request(apiBaseModel, 'POST', JSON.stringify(body));
    return res;
  };

  const getBrandsAutocomplete = async (inputText:string) => {
    const body = {
      text: inputText,
    };
    const res = await request(apiBaseBrands, 'PUT', JSON.stringify(body));
    return res;
  };
  const addNewBrand = async (newBrand:string) => {
    const body = {
      brand: newBrand,
    };
    const res = await request(apiBaseBrands, 'POST', JSON.stringify(body));
    return res;
  };

  return {
    getModelsAutocomplete,
    addNewModel,
    getBrandsAutocomplete,
    addNewBrand,
  };
};
export default useAutocompleteServices;
