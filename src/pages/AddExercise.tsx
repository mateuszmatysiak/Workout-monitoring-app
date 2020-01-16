import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';

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

const AddExercise = (props: any) => {
  const classes = useStyles();
  const [exercise, setExercise] = useState('');
  const { enqueueSnackbar } = props;
  const handleAddExerciese = () => {
    fetch('http://localhost:3100/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: exercise }),
    }).then(() =>
      enqueueSnackbar('Dodano ćwiczenie', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
    setExercise('');
  };

  return (
    <SidebarTemplate>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Typography variant="h5">Dodaj ćwiczenie</Typography>
          <TextField
            variant="outlined"
            label="Podaj nazwę ćwiczenia"
            className={classes.textField}
            value={exercise}
            onChange={(e: any) => setExercise(e.target.value)}
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
            <Button
              onClick={handleAddExerciese}
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={!exercise.length ? true : false}
            >
              Wyślij
            </Button>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
};

export default withSnackbar(AddExercise);
