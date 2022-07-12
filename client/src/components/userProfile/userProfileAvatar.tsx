import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Grid, IconButton, Input } from '@mui/material';
import { useStore } from 'effector-react';
import { $registeredUserData, uploadUserAvatar } from 'src/models/authorization/authorization';
import { IUser } from 'src/types/IUser';
import styles from './userProfile.module.scss';

interface IUserProfileAvatarProps {
  user: IUser;
}
const UserProfileAvatar = ({ user }:IUserProfileAvatarProps) => {
  const registeredUserData = useStore($registeredUserData);
  const addAvatar = (e) => {
    const file = e.target.files[0];
    uploadUserAvatar(file);
  };
  const userAvatar = (user?.avatar && user?._id !== registeredUserData?._id)
    ? <img alt={user.userName} src={`http://localhost:5000/${user.avatar}`} height="150" />
    : null;

  const registeredUserAvatar = (registeredUserData?.avatar && user?._id === registeredUserData?._id)
    ? <img alt={registeredUserData.userName} src={`http://localhost:5000/${registeredUserData.avatar}`} height="150" />
    : null;

  const uploadAvatar = (user?._id === registeredUserData?._id && !registeredUserData?.avatar) ? (
    <label htmlFor="icon-button-file">
      Загрузить Фотографию
      <Input onChange={addAvatar} id="icon-button-file" type="file" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <CameraAltIcon />
      </IconButton>
    </label>
  ) : null;

  return (
    <Grid className={styles.Profile_Block__Avatar} item md={12} sm={12} lg={12} xs={12}>
      {registeredUserAvatar}
      {userAvatar}
      {uploadAvatar}
    </Grid>

  );
};
export default UserProfileAvatar;
