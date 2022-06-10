import { Grid } from '@mui/material';
import clsx from 'clsx';
import { AdminPanelPage, AdminPanelProps } from '../../../pages/adminPanel';
import styles from './userItem.module.scss';

const UserItems = ({ data }: AdminPanelPage) => {
  const content = data?.map((item:AdminPanelProps) => {
    const itemStyle = clsx({
      [styles.Items_Block]: true,
      [styles.Viewed]: (item.roles[0] === 'ADMIN'),
    });

    return (
      <Grid key={item._id} item md={4} sm={6} lg={4} xs={12}>

        <div className={itemStyle}>
          <div>
            Имя -
            {item.userName}
          </div>
          <div>
            Эл. Адрес -
            {item.email}
          </div>
          <div>
            id -
            {item._id}
          </div>
          <div>
            Роль -
            {item.roles}
          </div>

        </div>
      </Grid>
    );
  });
  return (
    <div className="css-zow5z4-MuiGrid-root">
      {content}
    </div>
  );
};
export default UserItems;
