import React, { useState } from 'react';
import TextField from '../TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper, Typography, Avatar, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '../Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import TrainingPlanTable from '../TrainingPlanTable';
import EditPlan from '../EditPlan';

const useStyles = makeStyles(theme => ({
  textFieldWrapper: {
    margin: '0 16px',
  },
  textField: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '5px',
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
  },
  itemWrapper: {
    marginRight: '24px',
  },
  icon: {
    fill: theme.palette.grey[300],
  },
  avatar: {
    marginRight: '16px',
    backgroundColor: 'orange',
  },
}));

const dummyData = [
  {
    name: 'Trening siłowy',
    training: [
      {
        id: 222,
        name: 'Cwiczenie2',
        series: [
          {
            id: 0,
            repeat: 1,
            kg: 25,
            time: 5,
          },
          {
            id: 1,
            repeat: 1,
            kg: 20,
            time: 5,
          },
          {
            id: 2,
            repeat: 1,
            kg: 50,
            time: 5,
          },
        ],
      },
      {
        id: 2222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 22222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 2222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 22222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 222222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
    ],
  },
  {
    name: 'Trening siłowy2',
    training: [
      {
        id: 222,
        name: 'Cwiczenie2',
        series: [
          {
            id: 0,
            repeat: 1,
            kg: 25,
            time: 5,
          },
        ],
      },
      {
        id: 2222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 22222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 2222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 22222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
      {
        id: 222222222,
        name: 'Cwiczenie222',
        series: [
          {
            id: 0,
            repeat: 3,
            time: 2,
            kg: 20,
          },
          {
            id: 1,
            repeat: 3,
            time: 4,
            kg: 20,
          },
        ],
      },
    ],
  },
];

const shortcut = (name = '') => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const MyPlans = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const handleDeletePlan = () => console.log('Usunięto');
  const handleChangeTraining = (value: any) => setData(value);
  const handleEditPlan = () => console.log(data);
  return (
    <>
      <div className={classes.textFieldWrapper}>
        <TextField
          className={classes.textField}
          onChange={(e: any) => console.log(e)}
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
      {dummyData.map((item: any) => {
        const numberOfSeries = item.training
          .map((item: any) => item.series.length)
          .reduce((a: number, b: number) => a + b, 0);

        const numberOfItems = (type: string) =>
          item.training
            .map(({ series }: any) =>
              series.map((item: any) => item[type]).reduce((a: number, b: number) => a + b, 0),
            )
            .reduce((a: number, b: number) => a + b, 0);

        return (
          <Paper key={item.name} className={classes.paper}>
            <Box display="flex" alignItems="center" width="300px">
              <Avatar className={classes.avatar}>{shortcut(item.name)}</Avatar>
              <div className={classes.itemWrapper}>
                <Typography variant="body2">Nazwa</Typography>
                <Typography variant="h6">{item.name}</Typography>
              </div>
            </Box>
            <div className={classes.itemWrapper}>
              <Typography variant="body2">Ilość serii</Typography>
              <Typography variant="h6">{numberOfSeries}</Typography>
            </div>
            <div className={classes.itemWrapper}>
              <Typography variant="body2">Ilość kilogramów</Typography>
              <Typography variant="h6">{numberOfItems('kg')}</Typography>
            </div>
            <div className={classes.itemWrapper}>
              <Typography variant="body2">Ilość powtórzeń</Typography>
              <Typography variant="h6">{numberOfItems('repeat')}</Typography>
            </div>
            <div className={classes.itemWrapper}>
              <Typography variant="body2">Ilość minut</Typography>
              <Typography variant="h6">{numberOfItems('time')}</Typography>
            </div>
            <Box display="flex">
              <Dialog
                children="Czy na pewno chcesz usunąć plan treningowy z listy swoich planów? Czynność ta jest nieodwracalna!"
                tooltipTitle="Usuń"
                dialogTitle={`Usuń plan treningowy: ${item.name}`}
                buttonName="Usuń"
                dialogFunc={handleDeletePlan}
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
      })}
    </>
  );
};

export default MyPlans;
