import Button from '@mui/material/Button';
import { useAdvertisement } from 'src/hooks/useAdvertisment';
import { changeAddFormViewedModal, changeConfirmModal } from 'src/models/modal/modal';
import styles from './createAdvertisement.module.scss';

interface IAdvertisementButtonsProps {
  releaseYear:string | number;
  price: string;
  brand: string;
  model: string;
  description: string;
}
const AdvertisementButtons = ({
  releaseYear, price, model, brand, description,
}:IAdvertisementButtonsProps) => {
  const { saveDataFromAdvertisementForm } = useAdvertisement();
  const closeAdvertisementForm = () => {
    if (releaseYear || price || brand || model || description) {
      changeConfirmModal(true);
    } else changeAddFormViewedModal(false);
  };
  const saveDataCar = () => {
    saveDataFromAdvertisementForm(brand, model, price, releaseYear, description);
    changeAddFormViewedModal(false);
  };

  const saveButton = (releaseYear && price && Number(price) < 10000 && model && brand && description)
    ? <Button onClick={() => saveDataCar()} variant="outlined" color="success">Сохранить</Button>
    : <Button variant="outlined" disabled>Сохранить</Button>;

  return (
    <div className={styles.Add_Form__Button}>
      {saveButton}
      <Button onClick={() => closeAdvertisementForm()} variant="outlined" color="error">Отменить</Button>
    </div>
  );
};

export default AdvertisementButtons;
