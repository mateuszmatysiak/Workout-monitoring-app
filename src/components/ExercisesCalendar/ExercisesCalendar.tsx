import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { makeStyles } from '@material-ui/core/styles';

interface ExercisesCalendarProps {
  selectedDays: [];
  setSelectedDays: any;
}

const WEEKDAYS_SHORT: any = {
  pl: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
};

const MONTHS: any = {
  pl: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
};

const WEEKDAYS_LONG = {
  pl: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
};

const FIRST_DAY_OF_WEEK = {
  pl: 1,
};

const LABELS = {
  pl: { nextMonth: 'W przyszłym miesiącu', previousMonth: 'Poprzedni miesiąc' },
};

const useStyles = makeStyles(theme => ({
  daypicker: {
    fontSize: '150%',
    minHeight: '100%',
  },
}));

const ExercisesCalendar = ({ selectedDays, setSelectedDays }: ExercisesCalendarProps) => {
  const classes = useStyles();
  const [temporaryDays, setTemporaryDays] = useState([]);

  function renderDay(day: any) {
    const date = day.getDate();

    return (
      <div style={{ height: 105, width: 105, position: 'relative' }}>
        <div
          style={{ position: 'absolute', color: 'lightgray', bottom: 0, right: 0, fontSize: 20 }}
        >
          {date}
        </div>
      </div>
    );
  }

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
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <DayPicker
        className={classes.daypicker}
        selectedDays={selectedDays}
        showWeekNumbers
        renderDay={renderDay}
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
