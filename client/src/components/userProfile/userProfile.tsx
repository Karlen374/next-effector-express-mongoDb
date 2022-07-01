import { useStore } from 'effector-react';
import { useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Input } from '@mui/material';
import { $currentUserCars, loadCurrentUserCars } from 'src/models/currentUserCars/currentUserCars';
import { IUser } from 'src/types/IUser';
import { $userData, deleteUserAvatar, uploadUserAvatar } from 'src/models/authorization/authorization';
import CarList from 'src/components/carList/carList';
import styles from './userProfile.module.scss';

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
  const delUserAvatar = () => {
    deleteUserAvatar();
  };
  const userAvatar = (user?.avatar && user?._id !== userData?._id)
    ? <img alt={user.userName} src={`http://localhost:5000/${user.avatar}`} height="150" />
    : null;

  const loginUserAvatar = (userData?.avatar && user?._id === userData?._id)
    ? <img alt={userData.userName} src={`http://localhost:5000/${userData.avatar}`} height="150" />
    : null;

  const uploadAvatar = (user?._id === userData?._id && !userData?.avatar) ? (
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
          {loginUserAvatar}
          {userAvatar}
          {uploadAvatar}
        </Grid>
        <Grid item md={12} sm={12} lg={12} xs={12}>
          {loginUserAvatar && user?._id === userData?._id && (
          <Button onClick={() => delUserAvatar()} variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          )}
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
      {user._id !== userData._id && <CarList data={currentUserCars} />}
    </div>
  );
};

export default userProfile;
