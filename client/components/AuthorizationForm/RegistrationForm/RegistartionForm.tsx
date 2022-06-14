import { Grid, TextField } from '@mui/material';
import { useStore } from 'effector-react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  $registrationModal,
  changeLoginFormViewedModal,
  changeRegistrationFormViewedModal,
} from '../../../models/modal/modal';
import Modal from '../../shared/modal/modal';
import styles from './RegistrationForm.module.scss';
import { userRegistration } from '../../../models/authorization/authorization';

const RegistrationForm = () => {
  const registrationModal = useStore($registrationModal);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const openLoginForm = () => {
    changeLoginFormViewedModal(true);
    changeRegistrationFormViewedModal(false);
  };

  const registrationUser = () => {
    userRegistration({ userName, email, password });
    setUserName('');
    setEmail('');
    setPassword('');
    changeRegistrationFormViewedModal(false);
  };

  const closeRegistrationForm = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    changeRegistrationFormViewedModal(false);
  };
  return (
    <Modal active={registrationModal}>
      <CloseOutlinedIcon
        onClick={() => closeRegistrationForm()}
        className={styles.Registration__Form_Close}
      />
      <h2 className={styles.Registration__Form_Header}>Регистрация</h2>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="Имя"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-name"
            label="адрес эл. почты"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>
        <div className={styles.Registration__Form_Buttons}>
          <Button variant="contained" onClick={() => registrationUser()} color="success">
            Создать
          </Button>
          <Button variant="text" onClick={() => openLoginForm()} color="success">
            Уже есть Аккаунт ?
          </Button>
        </div>
      </Grid>
    </Modal>
  );
};

export default RegistrationForm;
