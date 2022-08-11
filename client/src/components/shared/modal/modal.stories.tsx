import LoginForm from 'src/components/AuthorizationForm/LoginForm/loginForm';
import RegistrationForm from 'src/components/AuthorizationForm/RegistrationForm/RegistrationForm';
import Modal from './modal';

export default {
  title: 'Modal',
  component: Modal,
};

const Template = (arg) => <Modal {...arg} />;

export const Login = Template.bind({});
Login.args = {
  active: true,
  children: <LoginForm />,
};

export const Registration = Template.bind({});
Registration.args = {
  active: true,
  children: <RegistrationForm />,
};
