import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BgImg from '../../assets/bg.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { object, string } from 'yup';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
  },
  wrapperForm: {
    backgroundColor: theme.palette.secondary.main,
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
    backgroundColor: theme.palette.secondary.main,
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
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
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

const SingsPanel = (props: any) => {
  const { enqueueSnackbar } = props;
  const classes = useStyles();
  const history = useHistory();
  const pathName = useLocation().pathname;
  const handleSubmit = ({ username, password, email }: any) => {
    fetch(
      pathName === '/login' ? 'http://localhost:3100/auth/login' : 'http://localhost:3100/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      },
    )
      .then((res: any) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(({ access_token }: any) => {
        if (access_token !== '') localStorage.setItem('token', access_token);
        localStorage.setItem('username', username);
        history.push('/calendar');
      })
      .then(() =>
        enqueueSnackbar('Zalogowano', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      )
      .catch(({ statusText }: any) => console.log(statusText));
  };
  return (
    <Formik
      initialValues={SignsValues}
      validationSchema={pathName === '/login' ? null : SignsSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        return (
          <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              className={classes.wrapperForm}
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <FitnessCenterIcon style={{ color: '#424242' }} />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ color: '#e0e0e0' }}>
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
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textFieldBorder,
                        input: classes.textFieldFont,
                      },
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFont,
                    }}
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
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                      InputLabelProps={{
                        className: classes.textFieldFont,
                      }}
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
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textFieldBorder,
                        input: classes.textFieldFont,
                      },
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFont,
                    }}
                  />
                  <ErrorMessage name="password">
                    {msg => <div className={classes.error}>{msg}</div>}
                  </ErrorMessage>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {pathName === '/login' ? 'Zaloguj się' : 'Zarejestruj się'}
                  </Button>
                  <Grid container>
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

export default withSnackbar(SingsPanel);
