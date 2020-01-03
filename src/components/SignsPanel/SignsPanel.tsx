import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BgImg from '../../assets/bg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SignsDialog from './SignsPanelDialog';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { object, string } from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.main,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: `underline`,
    },
  },
}));

const SignsSchema = object().shape({
  username: string()
    .min(5, 'Nazwa użytkownika musi posiadać co najmniej 5 znaków')
    .max(15, 'Nazwa użytkownika może posiadać maksymalnie 15 znaków')
    .required('To pole jest wymagane'),
  email: string()
    .email('Błędny adres email')
    .required('To pole jest wymagane'),
  password: string()
    .min(8, 'Hasło musi posiadać co najmniej 8 znaków')
    .required('To pole jest wymagane'),
});

const SignsValues = { username: '', email: '', password: '' };

const SingsPanel = () => {
  const classes = useStyles();

  const pathName = useLocation().pathname;
  const history = useHistory();

  const handleLogin = () => history.push('/calendar');
  const handleRegistration = () => console.log('Rejestracja');

  return (
    <Formik
      initialValues={SignsValues}
      validationSchema={pathName === '/login' ? null : SignsSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        return (
          <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <FitnessCenterIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {pathName === '/login' ? 'Logowanie' : 'Rejestracja'}
                </Typography>
                <Form className={classes.form} noValidate>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required={pathName === '/login' ? false : true}
                    fullWidth
                    id="username"
                    label="Nazwa użytkownika"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    component={TextField}
                  />
                  <ErrorMessage name="username">
                    {msg => <div className={classes.error}>{msg}</div>}
                  </ErrorMessage>
                  {pathName === '/login' ? null : (
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      component={TextField}
                    />
                  )}
                  <ErrorMessage name="email">
                    {msg => <div className={classes.error}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required={pathName === '/login' ? false : true}
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="current-password"
                    component={TextField}
                  />
                  <ErrorMessage name="password">
                    {msg => <div className={classes.error}>{msg}</div>}
                  </ErrorMessage>
                  {pathName === '/login' ? (
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Zapamiętaj mnie"
                    />
                  ) : null}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={pathName === '/login' ? handleLogin : handleRegistration}
                  >
                    {pathName === '/login' ? 'Zaloguj się' : 'Zarejestruj się'}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <SignsDialog />
                    </Grid>
                    <Grid item>
                      <Link
                        className={classes.link}
                        to={pathName === '/login' ? '/register' : '/login'}
                      >
                        {pathName === '/login'
                          ? 'Nie masz konta? Zarejestruj się!'
                          : 'Masz konto? Zaloguj się!'}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              </div>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
};

export default SingsPanel;