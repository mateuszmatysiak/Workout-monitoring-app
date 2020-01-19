import React, { useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  WEEKDAYS_SHORT,
  MONTHS,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK,
  LABELS,
} from '../../utils/localization';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  daypicker: {
    minHeight: '100%',
  },
  cell: {
    height: '12vh',
    width: '7vw',
    position: 'relative',
    cursor: 'pointer',

    '&:focus': {
      background: 'transparent',
    },
  },
  date: {
    position: 'absolute',
    color: 'lightgray',
    bottom: 0,
    right: 0,
    fontSize: 20,
  },
  titleInCell: {
    fontSize: '10px',
    textAlign: 'left',
  },
  wrapper: {
    display: 'flex',
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
  active: {
    color: '#ffc107',
    backgroundColor: 'rgba(255,255,255, .1)',
    borderRadius: 0,
    border: '1px solid rgba(255,255,255, .4)',
  },
  today: {
    borderBottom: '2px solid yellow',
  },
};

interface ExercisesCalendarProps {
  selectedDays: any[];
  setSelectedDays: (value: string) => void;
  calendarTrainingPlans: any;
  loading: boolean;
}

const ExercisesCalendar = ({
  selectedDays,
  calendarTrainingPlans,
  loading,
}: ExercisesCalendarProps) => {
  const classes = useStyles();
  const { dates, calendarDates } = calendarTrainingPlans;

  const fixedCalendarDates = calendarDates.map((item: any) => new Date(item));
  const modifiers = {
    active: fixedCalendarDates,
  };

  function renderDay(day: any) {
    const date = day.getDate();
    return (
      <div className={classes.cell}>
        <div className={classes.date}>{date}</div>
        {dates[date] &&
          dates[date].map((name: any, index: any) => (
            <div key={index} className={classes.titleInCell}>
              {name}
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
        <DayPicker
          className={classes.daypicker}
          selectedDays={selectedDays}
          showWeekNumbers
          renderDay={renderDay}
          modifiersStyles={modifiersStyles}
          modifiers={modifiers}
          locale={'pl'}
          months={MONTHS['pl']}
          weekdaysLong={WEEKDAYS_LONG['pl']}
          weekdaysShort={WEEKDAYS_SHORT['pl']}
          firstDayOfWeek={FIRST_DAY_OF_WEEK['pl']}
          labels={LABELS['pl']}
          onDayClick={(e: any) => console.log(e)}
        />
      )}
    </div>
  );
};

export default ExercisesCalendar;
