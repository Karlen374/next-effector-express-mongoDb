import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import { useStore } from 'effector-react';
import { $selectedCar } from 'src/models/editCar/editCar';
import ConfirmCancelModal from 'src/components/shared/confirmCancelModal/confirmCancelModal';
import { $models, getModelsForAutocomplete } from 'src/models/autocomplete/models';
import { $brands, getBrandsForAutocomplete } from 'src/models/autocomplete/brands';
import useDebounce from 'src/hooks/useDebounce';
import { NumberFormatMask } from 'src/helpers/numberFormatMask';
import styles from './createAdvertisement.module.scss';
import AdvertisementButtons from './advertisementButtons';

const CreateAdvertisement = () => {
  const selectedCar = useStore($selectedCar);
  const debouncedModels = useDebounce(getModelsForAutocomplete, 500);
  const debouncedBrands = useDebounce(getBrandsForAutocomplete, 500);
  const [releaseYear, setReleaseYear] = useState<number | string>('');
  const [price, setPrice] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const NumberFormatCustom = NumberFormatMask;

  const brands = useStore($brands);
  const models = useStore($models);

  useEffect(() => {
    if (selectedCar) {
      setReleaseYear(selectedCar.releaseYear);
      setPrice(String(selectedCar.price));
      setBrand(selectedCar.brand);
      setModel(selectedCar.model);
      setDescription(selectedCar.description);
      getBrandsForAutocomplete(selectedCar.brand);
      getModelsForAutocomplete(selectedCar.model);
    }
  }, []);

  const changeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const changePrice = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setPrice(e.target.value);
  };
  const changeModel = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setModel(e.target.value);
    debouncedModels(model);
  };
  const changeBrand = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setBrand(e.target.value);
    debouncedBrands(brand);
  };
  const changeReleaseYear = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setReleaseYear(e.target.value);
  };

  const modalHeader = selectedCar ? <h2>Редактировать Объявление</h2> : <h2>Разместить Объявление</h2>;

  return (

    <div className={styles.Add_Form}>
      <ConfirmCancelModal />
      {modalHeader}
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <TextField
            id="outlined-basic"
            value={releaseYear}
            onChange={changeReleaseYear}
            label="год выпуска"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <TextField
            label="цена:(Макс:10000$)"
            value={price}
            onChange={changePrice}
            id="outlined-basic"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={brands.map((option) => option.brand)}
            renderInput={(params) => <TextField {...params} value={brand} onChange={changeBrand} label="Марка" />}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={models.map((option) => option.model)}
            renderInput={(params) => <TextField {...params} value={model} onChange={changeModel} label="Модель" />}
          />
        </Grid>
      </Grid>
      <div className={styles.Add_Form__textarea}>
        <TextareaAutosize
          minRows={4}
          placeholder="Описание машины"
          style={{ maxWidth: 500, width: 205 }}
          value={description}
          onChange={changeDescription}
        />
      </div>

      <AdvertisementButtons
        releaseYear={releaseYear}
        model={model}
        price={price}
        description={description}
        brand={brand}
      />
    </div>
  );
};
export default CreateAdvertisement;
