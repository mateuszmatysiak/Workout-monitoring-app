import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CalendarSideButton from '../CalendarSideButton';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  WEEKDAYS_SHORT,
  MONTHS,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK,
  LABELS,
} from '../../../utils/localization';

const useStyles = makeStyles(theme => ({
  list: {
    width: 800,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
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
  table: {
    padding: '16px',
    backgroundColor: theme.palette.secondary.main,
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.dark,
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
  daypicker: {
    minHeight: '100%',
  },
  cell: {
    height: '12vh',
    width: '7vw',
    position: 'relative',
    cursor: 'pointer',
  },
  date: {
    position: 'absolute',
    color: 'lightgray',
    bottom: 0,
    right: 0,
    fontSize: 20,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
}));

const modifiersStyles = {
  selected: {
    color: '#ffc107',
    backgroundColor: 'rgba(255,255,255, .1)',
    borderRadius: 0,
    border: '1px solid rgba(255,255,255, .4)',
  },
  today: {
    borderBottom: '2px solid yellow',
  },
};

type DrawerSide = 'right';

interface CalendarSidebarProps {
  data: any;
  setData: any;
  selectedDays: any;
  setSelectedDays: any;
  trainingPlanData: any[];
}

const CalendarSidebar = ({
  data,
  setData,
  selectedDays,
  setSelectedDays,
  trainingPlanData,
}: CalendarSidebarProps) => {
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState({ right: false });
  const [temporaryDays, setTemporaryDays] = useState([]);
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

  const handleConnectDays = () => {
    setSelectedDays([temporaryDays]);
    setOpenSidebar({ right: false });
    // setData({
    //   title: '',
    //   trainingPlan: [],
    //   dates: [],
    // });
  };

  const handleDayClick = (day: never, { selected }: any) => {
    if (selected) {
      const selectedIndex = selectedDays.findIndex((selectedDay: any) =>
        DateUtils.isSameDay(selectedDay, day),
      );
      selectedDays.splice(selectedIndex, 1);
      setSelectedDays(selectedDays);
      setTemporaryDays(temporaryDays.concat(selectedDays));
    } else {
      selectedDays.push(day);
      setTemporaryDays(temporaryDays.concat(selectedDays));
      setSelectedDays(selectedDays);
    }
  };

  const [tableData] = trainingPlan.map((item: any) => item.training);
  const [selectValue] = trainingPlan.map((item: any) => item.name);

  return (
    <div style={{ background: 'red' }}>
      <Drawer anchor="right" open={openSidebar.right} onClose={toggleDrawer('right', false)}>
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
              onChange={(e: any) => {
                setData({
                  ...data,
                  trainingPlan: trainingPlanData.filter(
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
              {trainingPlanData.map(({ id, name }: any) => {
                return (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </TextField>
            <div className={classes.wrapper}>
              <DayPicker
                className={classes.daypicker}
                selectedDays={selectedDays}
                showWeekNumbers
                locale={'pl'}
                months={MONTHS['pl']}
                weekdaysLong={WEEKDAYS_LONG['pl']}
                weekdaysShort={WEEKDAYS_SHORT['pl']}
                firstDayOfWeek={FIRST_DAY_OF_WEEK['pl']}
                labels={LABELS['pl']}
                modifiersStyles={modifiersStyles}
                onDayClick={handleDayClick}
              />
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={handleConnectDays}
                disabled={
                  data.title.length && data.trainingPlan.length && data.dates.length ? false : true
                }
              >
                Zapisz
              </Button>
            </div>
          </div>
          {trainingPlan.length ? (
            <div className={classes.table}>
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
                      <TableHead className={classes.tableHeader}>
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
                              <TableCell className={classes.textFieldFont}>
                                Seria {id + 1}
                              </TableCell>
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
      </Drawer>
      <CalendarSideButton openSidebar={openSidebar.right} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

export default CalendarSidebar;
