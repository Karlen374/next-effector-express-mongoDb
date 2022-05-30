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
import { OptionType } from './OptionType';
import styles from './createAdvertisement.module.scss';
import { addCar, saveEditCar } from '../../../models/cars/cars';
import { ICar } from '../../../types/ICar';
import { changeViewedModal } from '../../../models/modal/modal';
import { $selectedCar } from '../../../models/editCar/editCar';

const brands: readonly OptionType[] = [
  { title: 'BMW' },
  { title: 'Ferrari' },
  { title: 'Volvo' },
];
const models: readonly OptionType[] = [
  { title: 'x5' },
  { title: 's60' },
  { title: 'enzo' },
  { title: 'm5' },
];

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

  const [releaseYear, setReleaseYear] = useState<number | string>('');
  const [price, setPrice] = useState<string>('');
  const [brand, setBrand] = useState<OptionType | string>('');
  const [model, setModel] = useState<OptionType | string>('');
  const [description, setDescription] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

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

  const changeReleaseYear = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setReleaseYear(e.target.value);
  };

  const closeAddForm = () => {
    if (releaseYear || price || brand || model || description) {
      setConfirmModal(true);
    } else changeViewedModal();
  };

  const getOptionLabel = (option: string | OptionType) => {
    if (typeof option === 'string') {
      return option;
    }

    if (option.inputValue) {
      return option.inputValue;
    }

    return option.title;
  };

  const saveDataCar = () => {
    const updBrand = (typeof brand === 'string') ? brand : brand.title;

    const updModel = (typeof model === 'string') ? model : model.title;

    let upPrice = '';

    for (let i = 0; i < price.length; i++) {
      if (price[i] !== ' ') upPrice += price.slice(i, i + 1);
    }

    const index = selectedCar ? selectedCar.id : uuid();

    const car: ICar = {
      id: index,
      brand: updBrand,
      model: updModel,
      price: +upPrice,
      releaseYear: +releaseYear,
      description,
      viewed: false,
      liked: false,
    };

    if (!selectedCar) addCar(car);
    else saveEditCar(car);
    changeViewedModal();
  };

  const closeModals = () => {
    setBrand('');
    setDescription('');
    setPrice('');
    setModel('');
    setReleaseYear('');
    setConfirmModal(false);
    changeViewedModal();
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
              value={brand}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setBrand({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setBrand({
                    title: newValue.inputValue,
                  });
                } else {
                  setBrand('');
                }
              }}
              selectOnFocus
              autoSelect
              id="free-solo-with-text-demo"
              options={brands}
              getOptionLabel={(option) => getOptionLabel(option)}
              renderOption={(props, option) => {
                if (typeof option !== 'string') return <li {...props}>{option.title}</li>;
                else return null;
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Марка" />
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Autocomplete
              value={model}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setModel({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setModel({
                    title: newValue.inputValue,
                  });
                } else {
                  setModel('');
                }
              }}
              autoSelect
              selectOnFocus
              id="free-solo-with-text-demo"
              options={models}
              getOptionLabel={(option) => getOptionLabel(option)}
              renderOption={(props, option) => {
                if (typeof option !== 'string') return <li {...props}>{option.title}</li>;
                else return null;
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Модель" />
              )}
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
