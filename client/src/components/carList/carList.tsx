import Grid from '@mui/material/Grid';
import { useStore } from 'effector-react';
import { useTransition, animated } from 'react-spring';
import { $modal } from 'src/models/modal/modal';
import { ICar } from 'src/types/ICar';
import Modal from 'src/components/shared/modal/modal';
import CreateAdvertisement from 'src/components/shared/createAdvertisement/createAdvertisement';
import CarItem from './carItem/carItem';
import styles from './carList.module.scss';

interface CarListProps {
  data:ICar[];
}

const CarList = ({ data }:CarListProps) => {
  const modal = useStore($modal);
  const transitions = useTransition(data, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item) => item.id,
  });
  return (
    <div>
      <Modal active={modal}>
        <CreateAdvertisement />
      </Modal>
      <div className={styles.Car_List}>
        <Grid container spacing={3}>
          <div className="css-zow5z4-MuiGrid-root">
            {transitions(({ opacity }, item) => (
              <Grid item md={4} sm={6} lg={4} xs={12}>
                <animated.div
                  style={{
                    opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                    transition: opacity
                      .to(() => 'opacity 100ms ease-in'),
                  }}
                >
                  <CarItem key={item.id} id={item.id} />
                </animated.div>
              </Grid>
            ))}
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default CarList;
