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
import Helmet from 'react-helmet';

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

  // const dates: any = {
  //   '1': ['Test']
  // }

  console.log(new Date('2020,01,01'))

  function renderDay(day: any, item: any) {
    const date = day.getDate();
    // console.log(day, fixedCalendarDates)
    console.log(fixedCalendarDates.filter((date: any) => date === day))
    return (
      <div className={classes.cell}>
        <div className={classes.date}>{date}</div>
        {dates[date] && item.active &&
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
          <>
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
              showOutsideDays={true}
            />
            <Helmet>
              <style>{`
            .DayPicker-wrapper {
              outline: none;
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
        )}
    </div>
  );
};

export default ExercisesCalendar;
