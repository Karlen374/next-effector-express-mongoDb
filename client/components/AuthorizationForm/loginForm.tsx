import { Grid, TextField } from '@mui/material';
import { useStore } from 'effector-react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { $loginModal, changeLoginFormViewedModal, changeRegistrationFormViewedModal } from '../../models/modal/modal';
import Modal from '../shared/modal/modal';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const loginModal = useStore($loginModal);
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const openRegistrationForm = () => {
    changeLoginFormViewedModal(false);
    changeRegistrationFormViewedModal(true);
  };

  return (
    <Modal active={loginModal}>
      <CloseOutlinedIcon onClick={() => changeLoginFormViewedModal(false)} className={styles.Login__Form_Close} />
      <h2 className={styles.Login__Form_Header}>Вход</h2>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-name"
            label="адрес эл. почты"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
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
          />
        </Grid>
        <div className={styles.Login__Form_Buttons}>
          <Button variant="contained" color="success">
            Войти
          </Button>
          <Button variant="text" color="success" onClick={() => openRegistrationForm()}>
            Регистрация
          </Button>
        </div>
      </Grid>
    </Modal>
  );
};

export default LoginForm;
