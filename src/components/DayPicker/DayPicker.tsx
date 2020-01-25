import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  WEEKDAYS_SHORT,
  MONTHS,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK,
  LABELS,
} from '../../utils/localization';
import Helmet from 'react-helmet';

const useStyles = makeStyles(theme => ({
  daypicker: {
    minHeight: '100%',
    color: theme.palette.grey[300],
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
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

interface DayPickerProps {
  selectedDays: any;
  setSelectedDays: (value: any) => void;
}

const DayPickerComponent = ({ selectedDays, setSelectedDays }: DayPickerProps) => {
  const classes = useStyles({});

  const [temporaryDays, setTemporaryDays] = useState([]);

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
        locale={'pl'}
        months={MONTHS['pl']}
        weekdaysLong={WEEKDAYS_LONG['pl']}
        weekdaysShort={WEEKDAYS_SHORT['pl']}
        firstDayOfWeek={FIRST_DAY_OF_WEEK['pl']}
        labels={LABELS['pl']}
        modifiersStyles={modifiersStyles}
        onDayClick={handleDayClick}
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

            @media (max-width: 600px) {
                .DayPicker-wrapper {
                  padding: 0 0 24px 0;
                  font-size: 13px;
                }
              }

            .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
              overflow: auto;
              border-radius: 0;
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
    </div>
  );
};

export default DayPickerComponent;
