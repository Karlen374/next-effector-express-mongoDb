import React, {
  useEffect, forwardRef, useState, ForwardRefExoticComponent, RefAttributes,
} from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import NumberFormat from 'react-number-format';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import { useStore } from 'effector-react';
import Modal from '../modal/modal';
import styles from './createAdvertisement.module.scss';
import { addCar, saveEditCar } from '../../../models/cars/cars';
import { ICar } from '../../../types/ICar';
import { changeAddFormViewedModal } from '../../../models/modal/modal';
import { $selectedCar } from '../../../models/editCar/editCar';
import { $models, addNewModelInAutocomplete, getModelsForAutocomplete } from '../../../models/autocomplete/models';
import { $brands, addNewBrandInAutocomplete, getBrandsForAutocomplete } from '../../../models/autocomplete/brands';
import useDebounce from '../../../hooks/useDebounce';
import { $userData } from '../../../models/authorization/authorization';

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom = forwardRef<ForwardRefExoticComponent<CustomProps & RefAttributes<any>>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(NewPrice) => {
          onChange({
            target: {
              value: NewPrice.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  },
);

const CreateAdvertisement = () => {
  const selectedCar = useStore($selectedCar);
  const userData = useStore($userData);
  const debouncedModels = useDebounce(getModelsForAutocomplete, 500);
  const debouncedBrands = useDebounce(getBrandsForAutocomplete, 500);

  const [releaseYear, setReleaseYear] = useState<number | string>('');
  const [price, setPrice] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const brands = useStore($brands);
  const models = useStore($models);

  useEffect(() => {
    if (selectedCar) {
      setReleaseYear(selectedCar.releaseYear);
      setPrice(String(selectedCar.price));
      setBrand(selectedCar.brand);
      setModel(selectedCar.model);
      setDescription(selectedCar.description);
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

  const closeAddForm = () => {
    if (releaseYear || price || brand || model || description) {
      setConfirmModal(true);
    } else changeAddFormViewedModal(false);
  };

  const saveDataCar = () => {
    let upPrice = '';

    for (let i = 0; i < price.length; i++) {
      if (price[i] !== ' ') upPrice += price.slice(i, i + 1);
    }

    const index = selectedCar ? selectedCar.id : uuid();

    const car: ICar = {
      id: index,
      brand,
      model,
      price: +upPrice,
      releaseYear: +releaseYear,
      description,
      viewed: false,
      liked: false,
      userId: userData._id,
      userName: userData.userName,
    };
    addNewModelInAutocomplete(model);
    addNewBrandInAutocomplete(brand);
    if (!selectedCar) addCar(car);
    else saveEditCar(car);
    changeAddFormViewedModal(false);
  };

  const closeModals = () => {
    setBrand('');
    setDescription('');
    setPrice('');
    setModel('');
    setReleaseYear('');
    setConfirmModal(false);
    changeAddFormViewedModal(false);
  };

  const saveButton = (releaseYear && price && Number(price) < 10000 && model && brand && description)
    ? <Button onClick={() => saveDataCar()} variant="outlined" color="success">Сохранить</Button>
    : <Button variant="outlined" disabled>Сохранить</Button>;

  const modalHeader = selectedCar ? <h2>Редактировать Объявление</h2> : <h2>Разместить Объявление</h2>;

  return (
    <>
      <Modal active={confirmModal}>
        <div>
          <h2>При Отмене все введенные данные потеряются</h2>
          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmModal(false)}
          >
            вернутся к заполнению
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => closeModals()}
          >
            Все равно отменить
          </Button>
        </div>
      </Modal>

      <div className={styles.Add_Form}>
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

        <div className={styles.Add_Form__Button}>
          {saveButton}
          <Button onClick={() => closeAddForm()} variant="outlined" color="error">Отменить</Button>
        </div>

      </div>
    </>
  );
};
export default CreateAdvertisement;
