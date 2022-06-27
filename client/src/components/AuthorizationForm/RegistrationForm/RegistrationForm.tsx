import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  changeLoginFormViewedModal,
  changeRegistrationFormViewedModal,
} from '../../../models/modal/modal';
import styles from './RegistrationForm.module.scss';
import { userRegistration } from '../../../models/authorization/authorization';

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });
  const openLoginForm = () => {
    changeLoginFormViewedModal(true);
    changeRegistrationFormViewedModal(false);
    reset();
  };

  const registrationUser = ({ userName, email, password }) => {
    userRegistration({ userName, email, password });
    reset();
    changeRegistrationFormViewedModal(false);
  };

  const closeRegistrationForm = () => {
    reset();
    changeRegistrationFormViewedModal(false);
  };
  return (
    <>
      <CloseOutlinedIcon
        onClick={() => closeRegistrationForm()}
        className={styles.Registration_Form__Close}
      />
      <h2 className={styles.Registration_Form__Header}>Регистрация</h2>
      <form onSubmit={handleSubmit(registrationUser)}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Имя"
              type="text"
              {...register('userName', {
                required: 'Это поле обязательное',
              })}
            />
            {errors.userName?.message && (
            <div className={styles.Registration_Form__ErrorMessage}>{errors.userName?.message}</div>
            )}
          </Grid>
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
            <div className={styles.Registration_Form__ErrorMessage}>{errors.email?.message}</div>)}
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
            <div className={styles.Registration_Form__ErrorMessage}>{errors.password?.message}</div>
            )}
          </Grid>
          <div className={styles.Registration_Form__Buttons}>
            <Button variant="contained" type="submit" color="success">
              Создать
            </Button>
            <Button variant="text" onClick={() => openLoginForm()} color="success">
              Уже есть Аккаунт ?
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
};

export default RegistrationForm;
