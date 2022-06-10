import { Grid } from '@mui/material';
import { AdminPanelPage } from '../../pages/adminPanel';
import UserItems from './userItem/userItems';
import styles from './userList.module.scss';

const UserList = ({ data }:AdminPanelPage) => {
  return (
    <div className={styles.User_List}>
      <Grid container spacing={3}>
        <UserItems data={data} />
      </Grid>
    </div>
  );
};

export default UserList;
