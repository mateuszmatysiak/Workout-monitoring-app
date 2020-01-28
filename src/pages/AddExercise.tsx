import React, { useState, useEffect } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckedTable from '../components/CheckedTable';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  wrapper: {
    display: 'flex',
    height: '100%',
    width: '50%',
    padding: '24px 16px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '5px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'unset',
      border: 0,
      marginTop: '24px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0',
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
  deleteWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80px',
    background: 'rgba(33, 33, 33, 0.5)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
    transition: 'transform .3s',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      paddingRight: '16px',
    },
  },
  activeDeleteWrapper: {
    transform: 'translateY(0)',
  },
  checkedCounter: {
    position: 'absolute',
    bottom: '26px',
    left: '65px',
  },
}));

const removeDuplicates = (data: any) => {
  return data.filter(function(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  });
};

const AddExercise = (props: any) => {
  const { enqueueSnackbar } = props;
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const classes = useStyles();
  const [exercise, setExercise] = useState('');
  const [listOfExercises, setListOfExercises] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3100/exercises/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res: any) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data: any) => {
        setListOfExercises(data);
        setFilteredList(removeDuplicates(data));
      })
      .catch(({ statusText }: any) =>
        enqueueSnackbar(`${statusText}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      );
  }, [enqueueSnackbar]);

  async function handleDeleteExercise(value: any) {
    await fetch('http://localhost:3100/exercises', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exercises: value, username }),
    }).then(() => {
      setChecked([]);
      enqueueSnackbar('Usunięto ćwiczenie', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    });
    await fetch(`http://localhost:3100/exercises/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        setListOfExercises(removeDuplicates(data));
        setFilteredList(removeDuplicates(data));
      });
  }

  async function handleAddExerciese() {
    await fetch('http://localhost:3100/exercises', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: exercise, username }),
    }).then(() =>
      enqueueSnackbar('Dodano ćwiczenie', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
    await fetch(`http://localhost:3100/exercises/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        setListOfExercises(removeDuplicates(data));
        setFilteredList(removeDuplicates(data));
      });
    setExercise('');
  }

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
              disabled={!exercise.length}
            >
              Wyślij
            </Button>
          </div>
        </div>
        <Box width="100%" height="100%">
          <CheckedTable
            title="Moje ćwiczenia"
            data={listOfExercises}
            filteredData={filteredList}
            setFilteredData={setFilteredList}
            checked={checked}
            setChecked={setChecked}
          />
        </Box>
      </div>
      <div
        className={clsx(classes.deleteWrapper, checked.length !== 0 && classes.activeDeleteWrapper)}
      >
        <Typography className={classes.checkedCounter} variant="subtitle1">
          {checked.length} wybrano
        </Typography>
        <Button
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={() => handleDeleteExercise(checked)}
        >
          Usuń
        </Button>
      </div>
    </SidebarTemplate>
  );
};

export default withSnackbar(AddExercise);
