import { useStore } from 'effector-react';
import { v4 as uuid } from 'uuid';
import { $registeredUserData } from 'src/models/authorization/authorization';
import { addNewBrandInAutocomplete } from 'src/models/autocomplete/brands';
import { addNewModelInAutocomplete } from 'src/models/autocomplete/models';
import { addCar, saveEditCar } from 'src/models/cars/cars';
import { $selectedCar } from 'src/models/editCar/editCar';
import { ICar } from 'src/types/ICar';

export const useAdvertisement = () => {
  const selectedCar = useStore($selectedCar);
  const registeredUserData = useStore($registeredUserData);

  const saveDataFromAdvertisementForm = async (brand, model, price, releaseYear, description) => {
    let updatePrice = '';
    for (let i = 0; i < price.length; i++) {
      if (price[i] !== ' ') updatePrice += price.slice(i, i + 1);
    }
    const index = selectedCar ? selectedCar.id : uuid();
    const car: ICar = {
      id: index,
      brand,
      model,
      price: +updatePrice,
      releaseYear: +releaseYear,
      description,
      viewed: false,
      userId: registeredUserData._id,
      userName: registeredUserData.userName,
    };
    addNewModelInAutocomplete(model);
    addNewBrandInAutocomplete(brand);
    if (!selectedCar) addCar(car);
    else saveEditCar(car);
  };
  return { saveDataFromAdvertisementForm };
};
