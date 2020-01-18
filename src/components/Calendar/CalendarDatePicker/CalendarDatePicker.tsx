import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import plLocale from 'date-fns/locale/pl';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '49%',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
  },
  datepickerIcon: {
    color: theme.palette.grey[300],
    cursor: 'pointer',
  },
}));

interface CalendarDatePickerProps {
  label: string;
  data: any[];
  setData: (value: any) => void;
  minDate?: string;
  maxDate?: string;
}

const CalendarDatePicker = ({
  label,
  data,
  setData,
  minDate,
  maxDate,
}: CalendarDatePickerProps) => {
  const classes = useStyles();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const { datesFrom, datesTo }: any = data;

  const handleChangeDateFrom = (e: any) => {
    setFrom(e);
    setData({ ...data, datesFrom: datesFrom.concat(e) });
  };

  const handleChangeDateTo = (e: any) => {
    setTo(e);
    setData({ ...data, datesTo: datesTo.concat(e) });
  };

  const handleResetDateFrom = () => {
    setData({ ...data, datesFrom: [] });
    setFrom(null);
  };

  const handleResetDateTo = () => {
    setData({ ...data, datesTo: [] });
    setTo(null);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
      <DatePicker
        openTo="date"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        label={label}
        disabled={datesFrom.length && datesTo.length ? true : false}
        views={['year', 'month', 'date']}
        value={label === 'Od' ? from : to}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(e: any) => (label === 'Od' ? handleChangeDateFrom(e) : handleChangeDateTo(e))}
        autoOk
        className={classes.textField}
        InputProps={{
          classes: {
            notchedOutline: classes.textFieldBorder,
            input: classes.textFieldFont,
          },
          endAdornment:
            datesFrom.length && datesTo.length ? (
              <InputAdornment
                position="end"
                className={classes.datepickerIcon}
                onClick={label === 'Od' ? handleResetDateFrom : handleResetDateTo}
              >
                <CloseIcon />
              </InputAdornment>
            ) : (
              <InputAdornment position="end" className={classes.datepickerIcon}>
                <EventIcon />
              </InputAdornment>
            ),
        }}
        InputLabelProps={{
          className: classes.textFieldFont,
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CalendarDatePicker;
