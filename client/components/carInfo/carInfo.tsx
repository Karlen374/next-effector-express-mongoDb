import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import styles from './carInfo.module.scss';
import { ICar } from '../../types/ICar';
import { changeLiked } from '../../models/cars/cars';

interface CarInfoProps {
  car: ICar,
}
const CarInfo = ({ car }:CarInfoProps) => {
  const [carInfo, setCarInfo] = useState<ICar>();
  const [liked, setLiked] = useState<Boolean>();
  useEffect(() => {
    setCarInfo(car);
    setLiked(car.liked);
  }, [car]);

  const changeCarLike = () => {
    changeLiked(carInfo?.id);
    setLiked(!liked);
  };
  const likeButton = !liked
    ? <FavoriteBorderIcon /> : <FavoriteIcon sx={{ color: red[900] }} />;

  return (
    <div className={styles.Car_Info}>

      <div className={styles.Car_Info__Img}>Картинка</div>

      <div>
        <IconButton
          onClick={() => changeCarLike()}
          aria-label="add to favorites"
        >
          {likeButton}
        </IconButton>
        <div>
          Марка-
          {carInfo?.brand}
        </div>
        <div>
          Название-
          {carInfo?.model}
        </div>
        <div>
          Год Выпуска-
          {carInfo?.releaseYear}
        </div>
        <div>
          Цена-
          {carInfo?.price}
        </div>
        <div>
          Описание-
          {carInfo?.description}
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
