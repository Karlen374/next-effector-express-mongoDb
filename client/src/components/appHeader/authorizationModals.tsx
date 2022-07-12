import { useStore } from 'effector-react';
import LoginForm from 'src/components/AuthorizationForm/LoginForm/loginForm';
import RegistrationForm from 'src/components/AuthorizationForm/RegistrationForm/RegistrationForm';
import Modal from 'src/components/shared/modal/modal';
import { $loginModal, $registrationModal } from 'src/models/modal/modal';

const AuthorizationModals = () => {
  const loginModal = useStore($loginModal);
  const registrationModal = useStore($registrationModal);

  return (
    <>
      <Modal active={loginModal}>
        <LoginForm />
      </Modal>
      <Modal active={registrationModal}>
        <RegistrationForm />
      </Modal>
    </>
  );
};
export default AuthorizationModals;
