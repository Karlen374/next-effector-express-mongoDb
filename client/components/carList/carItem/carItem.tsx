import Link from 'next/link';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { red, green } from '@mui/material/colors';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import styles from './carItem.module.scss';
import { selectEditCar } from '../../../models/editCar/editCar';
import { changeAddFormViewedModal } from '../../../models/modal/modal';
import {
  changeLiked,
  changeViewedCar,
  $cars,
} from '../../../models/cars/cars';
import { ICar } from '../../../types/ICar';
import { $userData } from '../../../models/authorization/authorization';

interface CarItemsProps {
  id:string;
}
const CarItem = ({ id }:CarItemsProps) => {
  const cars = useStore($cars);
  const userData = useStore($userData);
  const [item, setItem] = useState<ICar>(null);
  const editCarInfo = () => {
    selectEditCar(cars.filter((car) => car.id === id)[0]);
    changeAddFormViewedModal(true);
  };

  const loadData = async () => {
    const res = await fetch(`http://localhost:5000/api/cars/${id}`);
    const data = await res.json();
    setItem(data);
  };
  useEffect(() => {
    loadData();
  }, [cars]);

  if (!item) {
    return (
      <Grid item md={4} sm={6} lg={4} xs={12}>
        <div className={styles.Items_Block}>
          <CircularProgress />
        </div>
      </Grid>
    );
  }

  const likeButton = item.liked
    ? <FavoriteIcon sx={{ color: red[900] }} /> : <FavoriteBorderIcon />;

  const itemStyle = clsx({
    [styles.Items_Block]: true,
    [styles.Viewed]: item.viewed,
  });

  return (
    <div className={itemStyle}>
      <Link href={`/profile/${item.userId}`}>
        <div className={styles.Items_Block__Author}>
          Автор -
          {item.userName}
        </div>
      </Link>
      <div>
        Марка -
        {item.brand}
      </div>
      <div>
        Модель -
        {item.model}
      </div>
      <div>
        Стоимость -
        {item.price}
        {' '}
        $
      </div>
      <div>
        Год Выпуска -
        {item.releaseYear}
        г.
      </div>
      <IconButton
        className={styles.Items_Block__Like__Btn}
        onClick={() => changeLiked(item.id)}
        aria-label="add to favorites"
      >
        {likeButton}
      </IconButton>
      <Link href={`/${item.id}`}>
        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={() => changeViewedCar(item.id)}
        >
          Подробнее
        </Button>
      </Link>
      { ((userData && userData?._id === item.userId) || (userData?.role === 'ADMIN'))
      && (
      <Button
        variant="outlined"
        color="success"
        size="small"
        className={styles.Items_Block__Edit__Btn}
        onClick={() => editCarInfo()}
        endIcon={<EditIcon sx={{ color: green[700] }} />}
      >
        редактировать
      </Button>
      )}
    </div>
  );
};

export default CarItem;
