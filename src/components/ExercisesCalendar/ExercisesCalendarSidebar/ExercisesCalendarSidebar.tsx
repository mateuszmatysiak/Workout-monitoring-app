import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ExercisesCalendarSideButton from '../ExercisesCalendarSideButton';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ExercisesCalendarDatePicker from '../ExercisesCalendarDatePicker';

type DrawerSide = 'right';

const useStyles = makeStyles(theme => ({
  root: {},
  list: {
    width: 800,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.grey[300],
  },
  formWrapper: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
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
  datepickersWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px',
  },
}));

interface ExercisesCalendarSidebarProps {
  data: any[];
  setData: any;
  setSelectedDays: any;
}

const ExercisesCalendarSidebar = ({
  data,
  setData,
  setSelectedDays,
}: ExercisesCalendarSidebarProps) => {
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState({ right: false });

  const { trainingPlan, datesFrom, datesTo }: any = data;

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

  const sideList = () => (
    <div className={classes.list}>
      <Typography variant="h5" className={classes.title}>
        Dodaj plan treningowy do kalendarza
      </Typography>
      <div className={classes.formWrapper}>
        <TextField
          variant="outlined"
          label="Tytuł"
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
        />
        <TextField
          variant="outlined"
          label="Plan treningowy"
          select
          className={classes.textField}
          onChange={(e: any) => setData({ ...data, trainingPlan: e.target.value })}
          value={trainingPlan}
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
          {[{ value: 'P01' }, { value: 'P02' }, { value: 'P03' }].map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <div className={classes.datepickersWrapper}>
          <ExercisesCalendarDatePicker data={data} setData={setData} label="Od" maxDate={datesTo} />
          <ExercisesCalendarDatePicker
            data={data}
            setData={setData}
            label="Do"
            minDate={datesFrom}
          />
        </div>
      </div>
      <Button onClick={() => setSelectedDays([...datesFrom, ...datesTo])}>Zapisz</Button>
    </div>
  );

  return (
    <>
      <ExercisesCalendarSideButton
        openSidebar={openSidebar.right}
        setOpenSidebar={setOpenSidebar}
      />
      <Drawer anchor="right" open={openSidebar.right} onClose={toggleDrawer('right', false)}>
        {sideList()}
      </Drawer>
    </>
  );
};

export default ExercisesCalendarSidebar;
