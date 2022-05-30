import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import styles from './appHeader.module.scss';
import { changeViewedModal } from '../../models/modal/modal';
import { setSelectEditCar } from '../../models/editCar/editCar';

const AppHeader = () => {
  const openModalAddForm = () => {
    setSelectEditCar();
    changeViewedModal();
  };

  return (
    <div className={styles.Home_Page}>
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
