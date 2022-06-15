import { useStore } from 'effector-react';
import { useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Grid, IconButton, Input } from '@mui/material';
import { $currentUserCars, loadCurrentUserCars } from '../../models/currentUserCars/currentUserCars';
import { IUser } from '../../types/IUser';
import CarList from '../carList/carList';
import styles from './userProfile.module.scss';
import { $userData, uploadUserAvatar } from '../../models/authorization/authorization';

interface UserProfileProps {
  user: IUser;
}
const userProfile = ({ user }:UserProfileProps) => {
  const currentUserCars = useStore($currentUserCars);
  const userData = useStore($userData);
  useEffect(() => {
    loadCurrentUserCars(user._id);
  }, []);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    uploadUserAvatar(file);
  };
  const userAvatar = user?.avatar
    ? <img alt={user.userName} src={`http://localhost:5000/${user.avatar}`} height="150" /> : null;

  const uploadAvatar = (user?._id === userData?._id && !user?.avatar) ? (
    <label htmlFor="icon-button-file">
      Загрузить Фотографию
      <Input onChange={(e) => changeHandler(e)} id="icon-button-file" type="file" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <CameraAltIcon />
      </IconButton>
    </label>
  ) : null;

  return (
    <div className={styles.Profile_Block}>
      <Grid container spacing={5}>
        <Grid className={styles.Profile_Block__Avatar} item md={12} sm={12} lg={12} xs={12}>
          {userAvatar}
          {uploadAvatar}
        </Grid>
        <Grid item md={12} sm={12} lg={12} xs={12}>
          <h2>
            Автор -
            {' '}
            {user.userName}
          </h2>
          <div>
            Почта -
            {' '}
            {user.email}
          </div>

        </Grid>
      </Grid>
      <h2>
        Все Объявления
        {' '}
        {user.userName}
      </h2>
      <CarList data={currentUserCars} />
    </div>
  );
};

export default userProfile;
