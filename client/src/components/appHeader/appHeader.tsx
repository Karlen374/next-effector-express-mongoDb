import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  $chatModal,
  $loginModal,
  $registrationModal,
  changeAddFormViewedModal,
  changeLoginFormViewedModal,
} from 'src/models/modal/modal';
import { setSelectEditCar } from 'src/models/editCar/editCar';
import { $Alert } from 'src/models/errorAlert/errorAlert';
import LoginForm from 'src/components/AuthorizationForm/LoginForm/loginForm';
import RegistrationForm from 'src/components/AuthorizationForm/RegistrationForm/RegistrationForm';
import Chat from 'src/components/Chat/Chat';
import Modal from 'src/components/shared/modal/modal';
import {
  $registrationMessage,
  $userData,
  clearUserData,
  loadUserData,
} from 'src/models/authorization/authorization';
import styles from './appHeader.module.scss';
import AlertWarning from '../shared/alertWarning/alertWarning';

const AppHeader = () => {
  const alert = useStore($Alert);
  const registrationMessage = useStore($registrationMessage);
  const userData = useStore($userData);
  const loginModal = useStore($loginModal);
  const registrationModal = useStore($registrationModal);
  const chatModal = useStore($chatModal);
  const openModalAddForm = () => {
    setSelectEditCar();
    changeAddFormViewedModal(true);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const registrationAlert = (registrationMessage === 'success')
    ? <AlertWarning severity="success" variant="filled" text="Регистрация прошла успешно" />
    : <AlertWarning severity="error" variant="filled" text="Введите корректные Данные !!!" />;

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
          <Chip
            avatar={userData.avatar
              ? <Avatar alt={userData.userName} src={`http://localhost:5000/${userData.avatar}`} />
              : <Avatar>{userData.userName[0]}</Avatar>}
            sx={{ color: grey[50] }}
            variant="outlined"
            label={userData.userName}
          />
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
      {alert && (
        <div>
          <AlertWarning severity="error" variant="filled" text="Что-то пошло не так" />
        </div>
      )}
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
      <Modal active={loginModal}>
        <LoginForm />
      </Modal>
      <Modal active={registrationModal}>
        <RegistrationForm />
      </Modal>
      <Modal active={chatModal}>
        <Chat />
      </Modal>
    </div>
  );
};

export default AppHeader;
