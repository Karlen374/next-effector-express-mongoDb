// import { $cars } from 'src/models/cars/cars';
// import { $userData } from 'src/models/authorization/authorization';
import CarItem from './carItem';
// import styles from './carItem.module.scss';

export default {
  title: 'CarItem',
  component: CarItem,
};

const Template = (arg) => <CarItem {...arg} />;

export const WithPhoto = Template.bind({});
WithPhoto.args = {
  id: '53a9b765-fd0d-4f3b-835f-965e23680224',
};

export const WithoutPhoto = Template.bind({});
WithoutPhoto.args = {
  id: 'e5b97676-6cc8-4a7f-b820-e35d0e1aa861',
};
