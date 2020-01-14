import React from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '500px',
    height: '300px',
    display: 'flex',
    padding: '16px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[700]}`,
    borderRadius: '5px',

    [theme.breakpoints.down('xs')]: {
      width: 'unset',
      height: 'unset',
      border: 0,
    },
  },
  textField: {
    width: '100%',
    margin: '16px',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
  },
  buttonWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
}));

const AddExercise = () => {
  const classes = useStyles();
  return (
    <SidebarTemplate>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Typography variant="h5">Dodaj ćwiczenie</Typography>
          <TextField
            variant="outlined"
            label="Podaj nazwę ćwiczenia"
            className={classes.textField}
            onChange={(e: any) => console.log(e.target.value)}
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
          <div className={classes.buttonWrapper}>
            <Button variant="contained" className={classes.button} color="primary">
              Wyślij
            </Button>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
};

export default AddExercise;
