import Link from 'next/link';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { selectEditCar } from 'src/models/editCar/editCar';
import { changeAddFormViewedModal, changeChatModal } from 'src/models/modal/modal';
import { changeLiked, changeViewedCar, $cars } from 'src/models/cars/cars';
import { ICar } from 'src/types/ICar';
import { $userData } from 'src/models/authorization/authorization';
import { Button } from '@mui/material';
import { getCurrentChatRecipientName, getCurrentUsersMessages } from 'src/models/chat/chat';
import styles from './carItem.module.scss';

interface CarItemsProps {
  id:string;
}
const CarItem = ({ id }:CarItemsProps) => {
  const cars = useStore($cars);
  const userData = useStore($userData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [item, setItem] = useState<ICar>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editCarInfo = () => {
    selectEditCar(cars.filter((car) => car.id === id)[0]);
    changeAddFormViewedModal(true);
  };
  const openChatModal = () => {
    changeChatModal(true);
    handleClose();
    getCurrentUsersMessages({ senderId: userData._id, recipientId: item.userId });
    getCurrentChatRecipientName({ senderId: userData._id, recipientId: item.userId, recipientName: item.userName });
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

  const carPhoto = item?.carPhoto ? `http://localhost:5000/cars/${item.carPhoto}` : 'http://localhost:5000/noPhoto.jpg';

  const likeButton = item.likedUsersId.includes(userData?._id)
    ? <FavoriteIcon sx={{ color: red[900] }} /> : <FavoriteBorderIcon />;

  const viewedIcon = item.viewedUsersId.includes(userData?._id)
    ? <PreviewIcon sx={{ color: green[300] }} /> : <PreviewIcon />;
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
            {'   '}
            <IconButton
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="share"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Link href={`/${item.id}`}>
                <MenuItem onClick={() => changeViewedCar({ carId: item.id, userId: userData?._id })}>
                  Подробнее
                </MenuItem>
              </Link>
              { (userData && userData?._id !== item.userId) && (
                <MenuItem onClick={() => openChatModal()}>
                  Написать
                  {' '}
                  <RateReviewIcon />
                </MenuItem>
              )}
            </Menu>
          </Typography>
          {((userData?._id !== item.userId)
            && (
            <Link href={`/profile/${item.userId}`}>
              <Typography className={styles.Items_Block__Author} variant="subtitle2" component="div">
                Автор -
                {item.userName}
              </Typography>
            </Link>
            )
            )}
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Цена -
            {item.price}
            $
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Год Выпуска -
            {item.releaseYear}
          </Typography>
          {((userData && userData?._id === item.userId) || (userData?.role === 'ADMIN'))
          && (
          <Typography variant="subtitle2" color="text.secondary" component="div">
            <Button onClick={() => editCarInfo()} size="small" variant="text" startIcon={<EditIcon />}>
              Редактировать
            </Button>
          </Typography>
          )}
          {userData
          && (
            <>
              <IconButton onClick={() => changeLiked({ carId: item.id, userId: userData?._id })} aria-label="share">
                {likeButton}
                <Typography variant="subtitle2" color="text.secondary" component="p">
                  {item.likedUsersId.length}
                </Typography>
              </IconButton>
              <IconButton disabled>
                {viewedIcon}
                <Typography variant="subtitle2" color="text.secondary" component="p">
                  {item.viewedUsersId.length}
                </Typography>
              </IconButton>
            </>
          )}
        </CardContent>
      </Box>
    </Card>

  );
};

export default CarItem;
