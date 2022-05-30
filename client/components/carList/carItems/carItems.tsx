import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { red, green } from '@mui/material/colors';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import { ICar } from '../../../types/ICar';
import styles from './carItems.module.scss';
import { selectEditCar } from '../../../models/editCar/editCar';
import { changeViewedModal } from '../../../models/modal/modal';
import { changeLiked, changeViewedCar, $Loader } from '../../../models/cars/cars';

interface CarItemsProps {
  data:ICar[];
}

const CarItems = ({ data }:CarItemsProps) => {
  const editCarInfo = (id:string) => {
    selectEditCar(data.filter((item) => item.id === id)[0]);
    changeViewedModal();
  };
  const Loader = useStore($Loader);
  if (Loader) return <CircularProgress />;

  const content = data?.map((item:ICar) => {
    const likeButton = item.liked
      ? <FavoriteIcon sx={{ color: red[900] }} /> : <FavoriteBorderIcon />;

    const itemStyle = clsx({
      [styles.Items_Block]: true,
      [styles.Viewed]: item.viewed,
    });

    return (
      <CSSTransition
        key={item.id}
        timeout={1000}
        classNames="item"
      >
        <Grid item md={4} sm={6} lg={4} xs={12}>

          <div className={itemStyle}>
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
            <Button
              variant="outlined"
              color="success"
              size="small"
              className={styles.Items_Block__Edit__Btn}
              onClick={() => editCarInfo(item.id)}
              endIcon={<EditIcon sx={{ color: green[700] }} />}
            >
              редактировать
            </Button>
          </div>

        </Grid>
      </CSSTransition>
    );
  });
  return (
    <TransitionGroup className="css-zow5z4-MuiGrid-root">
      {content}
    </TransitionGroup>

  );
};

export default CarItems;
