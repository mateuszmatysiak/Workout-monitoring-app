import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ExercisesCalendarSideButton from '../ExercisesCalendarSideButton';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ExercisesCalendarDatePicker from '../ExercisesCalendarDatePicker';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type DrawerSide = 'right';

const useStyles = makeStyles(theme => ({
  list: {
    width: 800,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.grey[300],
  },
  formWrapper: {
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
  buttonWrapper: {
    width: '100%',
    textAlign: 'center',
    padding: '16px',
  },
  button: {
    width: '100%',
  },
}));

interface ExercisesCalendarSidebarProps {
  data: any[];
  setData: any;
  setSelectedDays: any;
  trainingPlanData: any[];
}

const ExercisesCalendarSidebar = ({
  data,
  setData,
  setSelectedDays,
  trainingPlanData,
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

  const handleConnectDays = () => {
    setSelectedDays([...datesFrom, ...datesTo]);
    setOpenSidebar({ right: false });
  };

  const [tableData] = trainingPlan.map((item: any) => item.training);
  const [selectValue] = trainingPlan.map((item: any) => item.name);

  const sideList = () => (
    <div className={classes.list}>
      <div style={{ minHeight: '35%' }}>
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
            onChange={(e: any) => {
              setData({
                ...data,
                trainingPlan: trainingPlanData.filter((item: any) => item.name === e.target.value),
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
            {trainingPlanData.map(({ id, name }: any) => {
              return (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <div className={classes.datepickersWrapper}>
            <ExercisesCalendarDatePicker
              data={data}
              setData={setData}
              label="Od"
              maxDate={datesTo}
            />
            <ExercisesCalendarDatePicker
              data={data}
              setData={setData}
              label="Do"
              minDate={datesFrom}
            />
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={handleConnectDays}
          >
            Zapisz
          </Button>
        </div>
      </div>
      {trainingPlan.length ? (
        <div style={{ margin: '16px', height: '50%' }}>
          <TableContainer
            component={Paper}
            style={{
              border: '1px solid #e0e0e0',
              borderBottom: 'unset',
              background: '#424242',
              height: '100%',
            }}
          >
            {tableData.map((item: any) => {
              return (
                <Table key={item.id}>
                  <TableHead style={{ background: '#121212' }}>
                    <TableRow>
                      <TableCell className={classes.textFieldFont}>{item.name}</TableCell>
                      <TableCell className={classes.textFieldFont} align="right">
                        Ciężar [kg]
                      </TableCell>
                      <TableCell className={classes.textFieldFont} align="right">
                        Czas [m]
                      </TableCell>
                      <TableCell className={classes.textFieldFont} align="right">
                        Powt.
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.series.map(({ id, kg, time, repeat }: any) => {
                      return (
                        <TableRow key={id}>
                          <TableCell className={classes.textFieldFont}>Seria {id + 1}</TableCell>
                          <TableCell className={classes.textFieldFont} align="right">
                            {kg}
                          </TableCell>
                          <TableCell className={classes.textFieldFont} align="right">
                            {time}
                          </TableCell>
                          <TableCell className={classes.textFieldFont} align="right">
                            {repeat}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              );
            })}
          </TableContainer>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <Drawer anchor="right" open={openSidebar.right} onClose={toggleDrawer('right', false)}>
        {sideList()}
      </Drawer>
      <ExercisesCalendarSideButton
        openSidebar={openSidebar.right}
        setOpenSidebar={setOpenSidebar}
      />
    </>
  );
};

export default ExercisesCalendarSidebar;
