import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import PreviewIcon from '@mui/icons-material/Preview';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { changeLiked } from 'src/models/cars/cars';
import { ICar } from 'src/types/ICar';
import { $registeredUserData } from 'src/models/authorization/authorization';
import styles from './carItem.module.scss';
import CarItemInfo from './carItemInfo';
import CarItemMenu from './carItemMenu';

export interface CarItemProps {
  id:string;
  likedUsersId: string[];
  viewedUsersId: string[];
}
const CarItem = ({ id, likedUsersId, viewedUsersId }:CarItemProps) => {
  const registeredUserData = useStore($registeredUserData);
  const [item, setItem] = useState<ICar>(null);

  const loadData = async () => {
    const res = await fetch(`http://localhost:5000/api/cars/${id}`);
    const data = await res.json();
    setItem(data);
  };
  useEffect(() => {
    loadData();
  }, [likedUsersId, viewedUsersId]);

  const changeCarLike = () => {
    changeLiked({ carId: item.id, userId: registeredUserData?._id });
  };

  const carPhoto = item?.carPhoto ? `http://localhost:5000/cars/${item.carPhoto}` : 'http://localhost:5000/noPhoto.jpg';

  const likeButton = item?.likedUsersId.includes(registeredUserData?._id)
    ? <FavoriteIcon sx={{ color: red[900] }} /> : <FavoriteBorderIcon />;

  const viewedIcon = item?.viewedUsersId.includes(registeredUserData?._id)
    ? <PreviewIcon sx={{ color: green[300] }} /> : <PreviewIcon />;

  if (!item) {
    return (
      <Grid item md={4} sm={6} lg={4} xs={12}>
        <div className={styles.Items_Block}>
          <CircularProgress />
        </div>
      </Grid>
    );
  }
  return (
    <Card className={styles.Items_Block} sx={{ mixWidth: 245 }}>
      <CardMedia
        component="img"
        sx={{ maxWidth: 180, backgroundColor: green[300] }}
        image={carPhoto}
        alt="Car Photo"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="subtitle1">
            Машина -
            {' '}
            {' '}
            {item.brand}
            {' '}
            {item.model}
            <CarItemMenu car={item} />
          </Typography>
          <CarItemInfo id={id} car={item} />
          {registeredUserData
          && (
            <>
              <IconButton onClick={changeCarLike} aria-label="share">
                {likeButton}
                <Typography variant="subtitle2" color="text.secondary" component="p">
                  {item?.likedUsersId.length}
                </Typography>
              </IconButton>
              <IconButton disabled>
                {viewedIcon}
                <Typography variant="subtitle2" color="text.secondary" component="p">
                  {item?.viewedUsersId.length}
                </Typography>
              </IconButton>
            </>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default React.memo(CarItem);
