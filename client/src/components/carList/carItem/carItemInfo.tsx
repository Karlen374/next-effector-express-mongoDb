import Typography from '@mui/material/Typography';
import { useStore } from 'effector-react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { $registeredUserData } from 'src/models/authorization/authorization';
import EditIcon from '@mui/icons-material/Edit';
import { ICar } from 'src/types/ICar';
import { selectEditCar } from 'src/models/editCar/editCar';
import { changeAddFormViewedModal } from 'src/models/modal/modal';
import { $cars } from 'src/models/cars/cars';
import styles from './carItem.module.scss';

interface ICarItemInfoProps {
  car: ICar;
  id: string;
}
const CarItemInfo = ({ car, id }:ICarItemInfoProps) => {
  const registeredUserData = useStore($registeredUserData);
  const cars = useStore($cars);

  const editCarInfo = () => {
    selectEditCar(cars.filter((item) => item.id === id)[0]);
    changeAddFormViewedModal(true);
  };
  return (
    <>
      {(registeredUserData?._id !== car.userId)
      && (
      <Link href={`/profile/${car.userId}`}>
        <Typography className={styles.Items_Block__Author} variant="subtitle2" component="div">
          Автор -
          {car.userName}
        </Typography>
      </Link>
      )}
      <Typography variant="subtitle2" color="text.secondary" component="div">
        Цена -
        {car.price}
        $
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" component="div">
        Год Выпуска -
        {car.releaseYear}
      </Typography>
      {((registeredUserData && registeredUserData?._id === car.userId) || (registeredUserData?.role === 'ADMIN'))
    && (
    <Typography variant="subtitle2" color="text.secondary" component="div">
      <Button onClick={() => editCarInfo()} size="small" variant="text" startIcon={<EditIcon />}>
        Редактировать
      </Button>
    </Typography>
    )}
    </>
  );
};
export default CarItemInfo;
