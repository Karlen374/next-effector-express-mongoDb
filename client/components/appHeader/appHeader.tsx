import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import { useStore } from 'effector-react';
import styles from './appHeader.module.scss';
import { changeViewedModal } from '../../models/modal/modal';
import { setSelectEditCar } from '../../models/editCar/editCar';
import { $Alert } from '../../models/cars/cars';

const AppHeader = () => {
  const alert = useStore($Alert);
  const openModalAddForm = () => {
    setSelectEditCar();
    changeViewedModal();
  };

  return (
    <div className={styles.Home_Page}>
      {alert && <Alert className={styles.Home_Page_Error} severity="error">Что-то пошло не так!</Alert>}
      <Grid container columnSpacing={{ lg: 90, md: 50 }} rowSpacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Link href="/">
            <Button variant="contained" color="success">Home Page</Button>
          </Link>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Button variant="contained" color="success" onClick={() => openModalAddForm()}>разместить объявление</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppHeader;
