import React, { useState, useEffect } from 'react';
import TextField from '../TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper, Typography, Avatar, Box, useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '../Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import TrainingPlanTable from '../TrainingPlanTable';
import EditPlan from '../EditPlan';
import { withSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  textFieldWrapper: {
    margin: '0 16px',
  },
  textField: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '5px',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  searchIcon: {
    color: theme.palette.grey[300],
    marginLeft: '6px',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[700]} !important`,
    color: theme.palette.grey[300],
    borderRadius: 0,
    border: 'unset',
  },
  textFieldFont: {
    color: theme.palette.grey[300],
    padding: '12px 4px 12px 12px',
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    margin: '16px 16px 0 16px',
    padding: '16px',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  itemWrapper: {
    marginRight: '24px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 0,
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '300px',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      padding: '12px 0',
    },
  },
  exerciseTitle: {
    [theme.breakpoints.down('sm')]: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      maxWidth: '250px',
      textAlign: 'center',
    },
  },
  icon: {
    fill: theme.palette.grey[300],
  },
  avatar: {
    marginRight: '16px',
    backgroundColor: 'orange',
  },
}));

const shortcut = (name = '') => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const MyPlans = (props: any) => {
  const { enqueueSnackbar } = props;
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainingPlanData, setTrainingPlanData] = useState([]);
  const [filteredTrainingPlanData, setFilteredTrainingPlanData] = useState([]);

  const getPlans = () => {
    setLoading(true);
    fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: '' }),
    })
      .then((res: any) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data: any) => {
        setTrainingPlanData(data);
        setFilteredTrainingPlanData(data);
      })
      .catch(({ statusText }: any) =>
        enqueueSnackbar(`${statusText}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      )
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getPlans();
  }, []);

  async function handleDeletePlan(value: any) {
    await fetch('http://localhost:3100/workoutplan', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: value }),
    }).then(() =>
      enqueueSnackbar('Usunięto plan', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );

    await getPlans();
  }
  const handleChangeTraining = (value: any) => setData(value);
  async function handleEditPlan() {
    await fetch('http://localhost:3100/workoutplan', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data[0]),
    }).then(() =>
      enqueueSnackbar('Edytowano plan', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
    await getPlans();
  }

  const handleSetFiltered = (value: any, data: any) => {
    setFilteredTrainingPlanData(
      data.filter(({ name }: any) => name.toLowerCase().includes(value.toLowerCase())),
    );
  };

  return (
    <Box paddingBottom="24px">
      <div className={classes.textFieldWrapper}>
        <TextField
          className={classes.textField}
          onChange={(e: any) => handleSetFiltered(e.target.value, trainingPlanData)}
          placeholder="Wyszukaj"
          Icon={
            <InputAdornment position="start">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          }
          inputClasses={{
            notchedOutline: classes.textFieldBorder,
            input: classes.textFieldFont,
          }}
        />
      </div>
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
        (filteredTrainingPlanData || []).map((item: any, index: any) => {
          const numberOfSeries = item.training
            .map((item: any) => item.series.length)
            .reduce((a: number, b: number) => a + b, 0);

          const numberOfItems = (type: string) =>
            item.training
              .map(({ series }: any) =>
                series.map((item: any) => item[type]).reduce((a: number, b: number) => a + b, 0),
              )
              .reduce((a: number, b: number) => a + b, 0);

          const items = [
            { title: 'Ilość serii', value: numberOfSeries },
            { title: 'Ilość kilogramów', value: numberOfItems('kg') },
            { title: 'Ilość powtórzeń', value: numberOfItems('repeat') },
            { title: 'Ilość minut', value: numberOfItems('time') },
          ];

          return (
            <Paper key={index} className={classes.paper}>
              <div className={classes.titleWrapper}>
                {!mobile && <Avatar className={classes.avatar}>{shortcut(item.name)}</Avatar>}
                <div className={classes.itemWrapper}>
                  <Typography variant="body2">Nazwa</Typography>
                  <Typography className={classes.exerciseTitle} variant="h6">
                    {item.name}
                  </Typography>
                </div>
              </div>
              {loading ? (
                <Box textAlign="center" margin="16px">
                  <CircularProgress />
                </Box>
              ) : (
                items.map(({ title, value }: any, index: any) => (
                  <div key={index} className={classes.itemWrapper}>
                    <Typography variant="body2">{title}</Typography>
                    <Typography variant="h6">{value}</Typography>
                  </div>
                ))
              )}
              <Box display="flex">
                <Dialog
                  children="Czy na pewno chcesz usunąć plan treningowy z listy swoich planów? Czynność ta jest nieodwracalna!"
                  tooltipTitle="Usuń"
                  dialogTitle={`Usuń plan treningowy: ${item.name}`}
                  buttonName="Usuń"
                  dialogFunc={() => handleDeletePlan(item.id)}
                  Icon={<DeleteIcon className={classes.icon} />}
                  deleteDialog
                />
                <Dialog
                  children={<EditPlan onChange={handleChangeTraining} data={new Array(item)} />}
                  tooltipTitle="Edycja"
                  dialogTitle={`Edytowanie planu: ${item.name}`}
                  buttonName="Edytuj"
                  dialogFunc={handleEditPlan}
                  Icon={<EditIcon className={classes.icon} />}
                  bigDialog
                />
                <Dialog
                  children={<TrainingPlanTable data={item.training} />}
                  tooltipTitle="Zobacz plan"
                  dialogTitle={`Plan treningowy: ${item.name}`}
                  buttonName="Wyjdź"
                  Icon={<VisibilityIcon className={classes.icon} />}
                  onlyOneButton
                  bigDialog
                />
              </Box>
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default withSnackbar(MyPlans);
