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
import Helmet from 'react-helmet';

const useStyles = makeStyles(theme => ({
  cell: {
    height: '13vh',
    width: '7vw',
    position: 'relative',
    cursor: 'pointer',

    '&:focus': {
      background: 'transparent',
    },
  },
  date: {
    position: 'absolute',
    color: theme.palette.grey[300],
    bottom: 0,
    right: 0,
    fontSize: 20,
  },
  titleInCell: {
    fontSize: '12px',
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
  },
  active: {
    color: '#ffc107',
    backgroundColor: 'rgba(255,255,255, .1)',
    borderRadius: 0,
  },
  today: {
    borderBottom: `2px solid #e0e0e0`,
  },
};

interface ExercisesCalendarProps {
  selectedDays: any[];
  setSelectedDays: (value: string) => void;
  calendarTrainingPlans: any;
  getTrainingPlan: (value: any) => void;
}

const ExercisesCalendar = ({
  selectedDays,
  calendarTrainingPlans,
  getTrainingPlan,
}: ExercisesCalendarProps) => {
  const classes = useStyles();
  const { dates, calendarDates } = calendarTrainingPlans;

  const fixedCalendarDates = calendarDates.map((item: any) => new Date(item));
  const modifiers = {
    active: fixedCalendarDates,
  };

  const isActive = (value: any) => {
    const isTrue = calendarTrainingPlans.calendarDates
      .map((item: any) => new Date(item).getDate())
      .includes(value.getDate());
    isTrue && getTrainingPlan(value);
  };

  function renderDay(day: any, item: any) {
    const date = day.getDate();
    return (
      <div className={classes.cell}>
        <div className={classes.date}>{date}</div>
        {dates[date] &&
          item.active &&
          dates[date].map((name: any, index: any) => (
            <div key={index} className={classes.titleInCell}>
              {name}
            </div>
          ))}
      </div>
    );
  }
  return (
    <>
      <DayPicker
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
        onDayClick={(e: any) => isActive(e)}
        showOutsideDays={true}
      />
      <Helmet>
        <style>{`
            .DayPicker-wrapper {
              outline: none;
              background-color: #212121;
              border-radius: 5px;
              margin: 16px;
              padding: 0 24px 24px 0;
            }
            .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
              background-color: #ffffff1a;
              border-radius: 0;
              border: 1px solid transparent;
            }
            .DayPicker-NavButton--prev {
              outline: none;
            }
            .DayPicker-NavButton--next {
              outline: none;
            }
            `}</style>
      </Helmet>
    </>
  );
};

export default ExercisesCalendar;
