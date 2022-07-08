import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import { ICar } from 'src/types/ICar';
import {
  changeLiked,
  deleteCarPhoto,
  $cars,
  $carPhotoChangeLoader,
} from 'src/models/cars/cars';
import { carPhotoUploadModal } from 'src/models/modal/modal';
import CarPhotoUpload from 'src/components/shared/carPhotoUpload/carPhotoUpload';
import { useStore } from 'effector-react';
import { $userData } from 'src/models/authorization/authorization';
import { getLocalStorage } from 'src/hooks/hooks';
import styles from './carInfo.module.scss';

interface CarInfoProps {
  car: ICar,
}
const CarInfo = ({ car }:CarInfoProps) => {
  const [carInfo, setCarInfo] = useState<ICar>();
  const [currentCarPhoto, setCurrentCarPhoto] = useState<string>('');
  const cars = useStore($cars);
  const userData = useStore($userData);
  const [liked, setLiked] = useState<boolean>(car.likedUsersId.includes(userData?._id));
  const carPhotoChangeLoader = useStore($carPhotoChangeLoader);

  useEffect(() => {
    setCarInfo(car);
    if (car.userId === userData?._id) {
      setCurrentCarPhoto(JSON.parse(getLocalStorage()?.getItem('currentCarPhoto') || ''));
    } else setCurrentCarPhoto(car.carPhoto);
  }, [cars]);

  const changeCarLike = () => {
    changeLiked({ carId: carInfo?.id, userId: userData?._id });
    setLiked(!liked);
  };
  if (carPhotoChangeLoader) {
    return (
      <Grid item md={4} sm={6} lg={4} xs={12}>
        <CircularProgress />
      </Grid>
    );
  }
  const likeButton = !liked
    ? <FavoriteBorderIcon /> : <FavoriteIcon sx={{ color: red[900] }} />;
  const carPhoto = currentCarPhoto
    ? `http://localhost:5000/cars/${currentCarPhoto}` : 'http://localhost:5000/noPhoto.jpg';

  const carPhotoChange = currentCarPhoto
    ? (
      <IconButton onClick={() => deleteCarPhoto(car.id)}>
        <DeleteIcon />
      </IconButton>
    )
    : (
      <IconButton onClick={() => carPhotoUploadModal(true)}>
        <DownloadIcon />
      </IconButton>
    );
  const viewCarPhotoChange = userData?._id === car?.userId ? carPhotoChange : null;
  return (
    <>
      <CarPhotoUpload id={car?.id} />
      <Card className={styles.Car_Info} sx={{ maxWidth: 545 }}>
        <CardHeader
          title={`${car?.brand} ${car?.model}`}
          subheader={`Год Выпуска - ${car?.releaseYear}, цена - ${car?.price}, Автор - ${car?.userName} `}
        />
        <CardMedia
          component="img"
          image={carPhoto}
          alt={car?.brand}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Описание:
            {' '}
            {car?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {userData
          && (
          <IconButton onClick={changeCarLike} aria-label="add to favorites">
            {likeButton}
          </IconButton>
          )}
          {viewCarPhotoChange}
        </CardActions>
      </Card>
    </>
  );
};

export default CarInfo;
