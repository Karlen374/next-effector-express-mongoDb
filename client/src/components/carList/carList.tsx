import Grid from '@mui/material/Grid';
import { useTransition, animated } from 'react-spring';
import { ICar } from 'src/types/ICar';
import CarItem from './carItem/carItem';
import styles from './carList.module.scss';

interface CarListProps {
  cars:ICar[];
}

const CarList = ({ cars }:CarListProps) => {
  const transitions = useTransition(cars, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    key: (item) => item.id,
  });

  return (
    <div className={styles.Car_List}>
      <Grid container spacing={3}>
        <div className="css-zow5z4-MuiGrid-root">
          {transitions(({ opacity }, item) => (
            <Grid item md={6} sm={6} lg={4} xs={12}>
              <animated.div
                style={{
                  opacity: opacity.to({ output: [0.2, 1], range: [0, 1] }),
                  transition: opacity
                    .to(() => 'opacity 100ms ease-in'),
                }}
              >
                <CarItem
                  key={item.id}
                  id={item.id}
                  likedUsersId={item.likedUsersId}
                  viewedUsersId={item.viewedUsersId}
                />
              </animated.div>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};
export default CarList;
