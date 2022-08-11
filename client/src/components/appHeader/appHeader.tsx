import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { changeAddFormViewedModal } from 'src/models/modal/modal';
import { setSelectEditCar } from 'src/models/editCar/editCar';
import { $apiErrorAlert } from 'src/models/apiErrorAlert/apiErrorAlert';
import {
  $loginMessage,
  $registrationMessage,
  $registeredUserData,
  loadRegisteredUserData,
} from 'src/models/authorization/authorization';
import AlertWarning from 'src/components/shared/alertWarning/alertWarning';
import styles from './appHeader.module.scss';
import AuthorizationButton from './authorizationButton';
import AuthorizationModals from './authorizationModals';
import CarModals from './carModals';

const AppHeader = () => {
  const apiErrorAlert = useStore($apiErrorAlert);
  const registrationMessage = useStore($registrationMessage);
  const loginMessage = useStore($loginMessage);
  const registeredUserData = useStore($registeredUserData);

  const openModalAddForm = () => {
    setSelectEditCar();
    changeAddFormViewedModal(true);
  };

  useEffect(() => {
    loadRegisteredUserData();
  }, []);

  const registrationAlert = (registrationMessage === 'success')
    ? <AlertWarning severity="success" variant="filled" text="Регистрация прошла успешно" />
    : <AlertWarning severity="error" variant="filled" text="Данный Email уже используется!!!" />;

  const currentRegisteredUserPanelButton = (registeredUserData?.role === 'ADMIN')
    ? (
      <Link href="/adminPanel">
        <Button variant="text" sx={{ color: grey[50] }}>Панель Администратора</Button>
      </Link>
    ) : (
      <Button
        variant="contained"
        color="success"
        onClick={() => openModalAddForm()}
      >
        разместить объявление
      </Button>
    );

  return (
    <div className={styles.Home_Page}>
      {apiErrorAlert && <AlertWarning severity="error" variant="filled" text="Что-то пошло не так" />}
      {registrationMessage && registrationAlert}
      {loginMessage && <AlertWarning severity="error" variant="filled" text="Введите корректные Данные !!!" />}

      <Grid container columnSpacing={{ lg: 90, md: 50 }} rowSpacing={3}>
        <AuthorizationButton />
        <Grid item lg={6} md={6} sm={6} xs={12}>
          {registeredUserData && currentRegisteredUserPanelButton}
        </Grid>
      </Grid>
      <AuthorizationModals />
      <CarModals />
    </div>
  );
};

export default React.memo(AppHeader);
