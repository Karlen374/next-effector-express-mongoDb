import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  changeLoginFormViewedModal,
  changeRegistrationFormViewedModal,
} from 'src/models/modal/modal';
import { userLogin } from 'src/models/authorization/authorization';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });
  const openRegistrationForm = () => {
    changeLoginFormViewedModal(false);
    reset();
    changeRegistrationFormViewedModal(true);
  };

  const LoginUser = ({ email, password }) => {
    userLogin({ email, password });
    reset();
    changeLoginFormViewedModal(false);
  };
  const closeLoginForm = () => {
    reset();
    changeLoginFormViewedModal(false);
  };
  return (
    <>
      <CloseOutlinedIcon onClick={() => closeLoginForm()} className={styles.Login_Form__Close} />
      <h2 className={styles.Login_Form__Header}>Вход</h2>
      <form onSubmit={handleSubmit(LoginUser)}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-name"
              label="адрес эл. почты"
              type="email"
              {...register('email', {
                required: 'Это поле обязательное',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Пожалуйста Введите корректный E-mail! ',
                },
              })}
            />
            {errors.email?.message && (
            <div className={styles.Login_Form__ErrorMessage}>{errors.email?.message}</div>
            )}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-password-input"
              label="Пароль"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Это поле обязательное',
                minLength: {
                  value: 5,
                  message: 'Пароль слишком короткий',
                },
              })}
            />
            {errors.password?.message && (
            <div className={styles.Login_Form__ErrorMessage}>{errors.password?.message}</div>
            )}
          </Grid>
          <div className={styles.Login_Form__Buttons}>
            <Button type="submit" variant="contained" color="success">
              Войти
            </Button>
            <Button variant="text" color="success" onClick={() => openRegistrationForm()}>
              Регистрация
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
