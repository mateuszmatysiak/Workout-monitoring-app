import React from 'react';
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

const useStyles = makeStyles(theme => ({
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

interface ExercisesCalendarProps {
  selectedDays: [];
  setSelectedDays: any;
  calendarTrainingPlans: any;
}

const ExercisesCalendar = ({ selectedDays, calendarTrainingPlans }: ExercisesCalendarProps) => {
  const classes = useStyles();

  function renderDay(day: any) {
    const date = day.getDate();
    return (
      <div className={classes.cell}>
        <div className={classes.date}>{date}</div>
        {calendarTrainingPlans[date] &&
          calendarTrainingPlans[date].map((name: any, index: any) => (
            <div key={index} style={{ fontSize: '20px', textAlign: 'left' }}>
              {name}
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <DayPicker
        className={classes.daypicker}
        selectedDays={selectedDays}
        showWeekNumbers
        renderDay={renderDay}
        modifiersStyles={modifiersStyles}
        locale={'pl'}
        months={MONTHS['pl']}
        weekdaysLong={WEEKDAYS_LONG['pl']}
        weekdaysShort={WEEKDAYS_SHORT['pl']}
        firstDayOfWeek={FIRST_DAY_OF_WEEK['pl']}
        labels={LABELS['pl']}
      />
    </div>
  );
};

export default ExercisesCalendar;
