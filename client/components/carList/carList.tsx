import Grid from '@mui/material/Grid';
import { useStore } from 'effector-react';
import Modal from '../shared/modal/modal';
import CreateAdvertisement from '../shared/createAdvertisement/createAdvertisement';
import CarItems from './carItems/carItems';
import styles from './carList.module.scss';
import { $viewedCars } from '../../models/viewedCars/viewedCars';
import { $modal } from '../../models/modal/modal';

const CarList = () => {
  const cars = useStore($viewedCars) || [];
  const modal = useStore($modal);

  return (
    <div>

      <Modal active={modal}>
        <CreateAdvertisement />
      </Modal>

      <div className={styles.Car_List}>
        <Grid container spacing={3}>
          <CarItems data={cars} />
        </Grid>
      </div>

    </div>
  );
};

export default CarList;
