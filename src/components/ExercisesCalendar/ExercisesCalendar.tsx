import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { makeStyles } from '@material-ui/core/styles';
import { WEEKDAYS_SHORT, MONTHS, WEEKDAYS_LONG, FIRST_DAY_OF_WEEK, LABELS } from './localization';

interface ExercisesCalendarProps {
  selectedDays: [];
  setSelectedDays: any;
}

const useStyles = makeStyles(theme => ({
  daypicker: {
    fontSize: '150%',
    minHeight: '100%',
  },
  cell: {
    height: 105,
    width: 105,
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
    alignItems: 'center',
    height: '100%',
  },
}));

const ExercisesCalendar = ({ selectedDays, setSelectedDays }: ExercisesCalendarProps) => {
  const classes = useStyles();
  const [temporaryDays, setTemporaryDays] = useState([]);

  function renderDay(day: any) {
    const date = day.getDate();

    return (
      <div className={classes.cell}>
        <div className={classes.date}>{date}</div>
      </div>
    );
  }

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
        onDayClick={(e: any) => console.log(e)}
      />
    </div>
  );
};

export default ExercisesCalendar;
