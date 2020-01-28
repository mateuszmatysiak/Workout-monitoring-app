import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CalendarSideButton from '../CalendarSideButton';
import { Typography, Button, Box, Tooltip, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DayPicker from '../../DayPicker';
import TrainingPlanTable from '../../TrainingPlanTable';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useStyles = makeStyles(theme => ({
  list: {
    width: 800,
    height: '100%',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    overflowX: 'hidden',

    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  formWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  textField: {
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
    padding: '16px',
  },
  button: {
    width: '100%',
  },
}));

type DrawerSide = 'right';

interface CalendarSidebarProps extends WithSnackbarProps {
  data: any;
  setData: (value: any) => void;
  setSelectedDays: (value: any) => void;
  trainingPlanData: any[];
  setCalendarTrainingPlans: (value: any) => void;
  enqueueSnackbar: any;
}

const CalendarSidebar = ({
  data,
  setData,
  setSelectedDays,
  trainingPlanData,
  setCalendarTrainingPlans,
  enqueueSnackbar,
}: CalendarSidebarProps) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [openSidebar, setOpenSidebar] = useState({ right: false });
  const [pickedDays, setPickedDays] = useState([]);
  const { trainingPlan }: any = data;

  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSidebar({ ...openSidebar, [side]: open });
  };

  async function handleAddPlanWithDate() {
    setOpenSidebar({ right: false });
    await fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, dates: pickedDays, username }),
    }).then(() =>
      enqueueSnackbar('Dodano plan treningowy do kalendarza', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
    await fetch(`http://localhost:3100/userworkout/info/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res: any) => res.json())
      .then(({ dates, calendarDates }: any) =>
        setCalendarTrainingPlans({ dates: dates, calendarDates: calendarDates }),
      );
    setData({
      title: '',
      trainingPlan: [],
      dates: [],
    });
    setSelectedDays([]);
    setPickedDays([]);
  }
  const [tableData] = (trainingPlan || []).map((item: any) => item.training);
  const [selectValue] = (trainingPlan || []).map((item: any) => item.name);

  return (
    <div>
      <Drawer anchor="right" open={openSidebar.right} onClose={toggleDrawer('right', false)}>
        <div className={classes.list}>
          <Typography variant="h5" className={classes.title}>
            Dodaj plan treningowy do kalendarza
            <Tooltip title="Wyczyść wszystko">
              <IconButton
                onClick={() => {
                  setData({
                    title: '',
                    trainingPlan: [],
                    dates: [],
                  });
                  setPickedDays([]);
                }}
              >
                <ClearAllIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Typography>
          <div className={classes.formWrapper}>
            <TextField
              variant="outlined"
              label="Tytuł"
              value={data.title}
              className={classes.textField}
              onChange={(e: any) => setData({ ...data, title: e.target.value })}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldBorder,
                  input: classes.textFieldFont,
                },
              }}
              InputLabelProps={{
                className: classes.textFieldFont,
              }}
              inputProps={{ maxLength: 25 }}
            />
            <TextField
              variant="outlined"
              label="Plan treningowy"
              select
              className={classes.textField}
              onChange={(e: any) => {
                setData({
                  ...data,
                  trainingPlan: (trainingPlanData || []).filter(
                    (item: any) => item.name === e.target.value,
                  ),
                });
              }}
              value={selectValue || ''}
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldBorder,
                  input: classes.textFieldFont,
                },
              }}
              InputLabelProps={{
                className: classes.textFieldFont,
              }}
            >
              {(trainingPlanData || []).map(({ name }: any, index: any) => {
                return (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </TextField>
            <DayPicker selectedDays={pickedDays} setSelectedDays={setPickedDays} />
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={handleAddPlanWithDate}
                disabled={data.title.length && data.trainingPlan.length ? false : true}
              >
                Zapisz
              </Button>
            </div>
          </div>
          {trainingPlan.length ? (
            <Box padding="16px">
              <TrainingPlanTable data={tableData} />
            </Box>
          ) : null}
        </div>
      </Drawer>
      <CalendarSideButton openSidebar={openSidebar.right} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

export default withSnackbar(CalendarSidebar);
