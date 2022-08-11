import { useStore } from 'effector-react';
import { $registeredUserData, clearRegisteredUserData } from 'src/models/authorization/authorization';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { changeLoginFormViewedModal } from 'src/models/modal/modal';
import styles from './appHeader.module.scss';

const AuthorizationButton = () => {
  const registeredUserData = useStore($registeredUserData);
  const content = registeredUserData
    ? (
      <>
        <Link href={`/profile/${registeredUserData._id}`}>
          <Chip
            avatar={registeredUserData.avatar
              ? <Avatar alt={registeredUserData.userName} src={`http://localhost:5000/${registeredUserData.avatar}`} />
              : <Avatar>{registeredUserData.userName[0]}</Avatar>}
            sx={{ color: grey[50] }}
            variant="outlined"
            label={registeredUserData.userName}
          />
        </Link>
        <Button
          variant="text"
          className={styles.Home_Page_Button}
          onClick={() => clearRegisteredUserData()}
        >
          <LogoutIcon />
        </Button>
      </>
    )
    : (
      <Button
        variant="text"
        className={styles.Home_Page_Button}
        onClick={() => changeLoginFormViewedModal(true)}
      >
        Вход
      </Button>
    );
  return (
    <Grid item lg={6} md={6} sm={6} xs={12}>
      { content }
      <Link href="/">
        <Button variant="contained" color="success">Home Page</Button>
      </Link>
    </Grid>
  );
};
export default AuthorizationButton;
