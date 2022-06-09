import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import { useStore } from 'effector-react';
import styles from './appHeader.module.scss';
import { changeAddFormViewedModal, changeLoginFormViewedModal } from '../../models/modal/modal';
import { setSelectEditCar } from '../../models/editCar/editCar';
import { $Alert } from '../../models/errorAlert/errorAlert';
import LoginForm from '../AuthorizationForm/loginForm';
import RegistrationForm from '../AuthorizationForm/RegistartionForm';

const AppHeader = () => {
  const alert = useStore($Alert);
  const openModalAddForm = () => {
    setSelectEditCar();
    changeAddFormViewedModal(true);
  };

  return (
    <div className={styles.Home_Page}>
      {alert && <Alert className={styles.Home_Page_Error} severity="error">Что-то пошло не так!</Alert>}
      <Grid container columnSpacing={{ lg: 90, md: 50 }} rowSpacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button variant="text" onClick={() => changeLoginFormViewedModal(true)}>Вход </Button>
          <Link href="/">
            <Button variant="contained" color="success">Home Page</Button>
          </Link>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button variant="contained" color="success" onClick={() => openModalAddForm()}>разместить объявление</Button>
        </Grid>
      </Grid>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default AppHeader;
