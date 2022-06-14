import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './appHeader.module.scss';
import { changeAddFormViewedModal, changeLoginFormViewedModal } from '../../models/modal/modal';
import { setSelectEditCar } from '../../models/editCar/editCar';
import { $Alert } from '../../models/errorAlert/errorAlert';
import LoginForm from '../AuthorizationForm/LoginForm/loginForm';
import RegistrationForm from '../AuthorizationForm/RegistrationForm/RegistartionForm';
import {
  $registrationMessage,
  $userData,
  clearUserData,
  loadUserData,
} from '../../models/authorization/authorization';

const AppHeader = () => {
  const alert = useStore($Alert);
  const registrationMessage = useStore($registrationMessage);
  const userData = useStore($userData);
  const openModalAddForm = () => {
    setSelectEditCar();
    changeAddFormViewedModal(true);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const registrationAlert = (registrationMessage === 'success')
    ? <Alert severity="success" variant="filled" sx={{ width: '100%' }}>Регистрация прошла успешно </Alert>
    : <Alert severity="error" variant="filled" sx={{ width: '100%' }}>Введите корректные Данные !!! </Alert>;

  const adminPanelButton = (userData?.role === 'ADMIN')
    ? (
      <Link href="/adminPanel">
        <Button variant="text" sx={{ color: grey[50] }}>Панель Администратора</Button>
      </Link>
    ) : null;

  const contentAuth = userData
    ? (
      <>
        <Link href={`/profile/${userData._id}`}>
          <Chip icon={<FaceIcon />} sx={{ color: grey[50] }} variant="outlined" label={userData.userName} />
        </Link>
        <Button
          variant="text"
          className={styles.Home_Page_Button}
          onClick={() => clearUserData()}
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
    <div className={styles.Home_Page}>
      {alert && <Alert className={styles.Home_Page_Error} severity="error">Что-то пошло не так!</Alert>}
      {registrationMessage && registrationAlert}
      <Grid container columnSpacing={{ lg: 90, md: 50 }} rowSpacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          {contentAuth}
          <Link href="/">
            <Button variant="contained" color="success">Home Page</Button>
          </Link>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          {userData && (
          <Button
            variant="contained"
            color="success"
            onClick={() => openModalAddForm()}
          >
            разместить объявление
          </Button>
          )}
          {adminPanelButton}
        </Grid>
      </Grid>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default AppHeader;
