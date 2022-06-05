import Grid from '@mui/material/Grid';
import { useStore } from 'effector-react';
import { TransitionGroup } from 'react-transition-group';
import { cloneElement } from 'react';
import Modal from '../shared/modal/modal';
import CreateAdvertisement from '../shared/createAdvertisement/createAdvertisement';
import CarItem from './carItem/carItem';
import styles from './carList.module.scss';
import { $modal } from '../../models/modal/modal';
import { ICar } from '../../types/ICar';

interface CarListProps {
  data:ICar[];
}

const CarList = ({ data }:CarListProps) => {
  const modal = useStore($modal);

  const content = data?.map((item) => {
    return (
      <CarItem key={item.id} id={item.id} />
    );
  });
  return (
    <div>
      <Modal active={modal}>
        <CreateAdvertisement />
      </Modal>
      <div className={styles.Car_List}>
        <Grid container spacing={3}>
          {/* <TransitionGroup
            className="css-zow5z4-MuiGrid-root"
            сhildFactory={(child) => cloneElement(child, { classNames: 'item' })}
          > */}
            { content }
          {/* </TransitionGroup> */}
        </Grid>
      </div>
    </div>
  );
};
export default CarList;
