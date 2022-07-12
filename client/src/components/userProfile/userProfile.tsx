import { useStore } from 'effector-react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { $currentUserCars, loadCurrentUserCars } from 'src/models/currentUserCars/currentUserCars';
import { IUser } from 'src/types/IUser';
import { $registeredUserData, deleteUserAvatar, $userAvatarPhotoLoader } from 'src/models/authorization/authorization';
import CarList from 'src/components/carList/carList';
import styles from './userProfile.module.scss';
import UserProfileAvatar from './userProfileAvatar';

interface UserProfileProps {
  user: IUser;
}
const userProfile = ({ user }:UserProfileProps) => {
  const currentUserCars = useStore($currentUserCars);
  const registeredUserData = useStore($registeredUserData);
  const userAvatarPhotoLoader = useStore($userAvatarPhotoLoader);

  useEffect(() => {
    loadCurrentUserCars(user._id);
  }, []);

  const delUserAvatar = () => {
    deleteUserAvatar();
  };
  if (userAvatarPhotoLoader) {
    return (
      <Grid item md={4} sm={6} lg={4} xs={12}>
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <div className={styles.Profile_Block}>
      <Grid container spacing={5}>
        <UserProfileAvatar user={user} />
        <Grid item md={12} sm={12} lg={12} xs={12}>
          {registeredUserData?.avatar && user?._id === registeredUserData?._id && (
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
      {user._id !== registeredUserData?._id && (
      <>
        <h2>
          Все Объявления
          {' '}
          {user.userName}
        </h2>
        <CarList cars={currentUserCars} />
      </>
      )}
    </div>
  );
};

export default userProfile;
