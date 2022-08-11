import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { IUser } from 'src/types/IUser';
import { $registeredUserData, deleteUserAvatar, $userAvatarPhotoLoader } from 'src/models/authorization/authorization';
import CarList from 'src/components/carList/carList';
import { $cars } from 'src/models/cars/cars';
import { ICar } from 'src/types/ICar';
import styles from './userProfile.module.scss';
import UserProfileAvatar from './userProfileAvatar';

interface UserProfileProps {
  user: IUser;
}
const userProfile = ({ user }:UserProfileProps) => {
  const cars = useStore($cars);
  const [currentUserCars, setCurrentUserCars] = useState<ICar[]>();
  const registeredUserData = useStore($registeredUserData);
  const userAvatarPhotoLoader = useStore($userAvatarPhotoLoader);
  useEffect(() => {
    setCurrentUserCars(cars?.filter((item) => item.userId === user._id));
  }, [cars]);

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
      <h2>
        Все Объявления
        {' '}
        {user.userName}
      </h2>
      <CarList cars={currentUserCars} />
    </div>
  );
};

export default userProfile;
