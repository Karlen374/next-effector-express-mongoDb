import { Grid } from '@mui/material';
import { useStore } from 'effector-react';
import { $allUsers } from '../../models/users/user';
import UserItems from './userItem/userItems';
import styles from './userList.module.scss';

const UserList = () => {
  const allUsers = useStore($allUsers);
  return (
    <div className={styles.User_List}>
      <Grid container spacing={3}>
        <UserItems data={allUsers} />
      </Grid>
    </div>
  );
};

export default UserList;
