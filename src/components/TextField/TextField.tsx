import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
    borderRadius: 0,
    border: 'none',
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
  },
  textFieldFont: {
    color: theme.palette.grey[300],
    padding: '8px 4px 8px 12px',
  },
}));

interface TextFieldProps {
  onChange: any;
  onInput?: any;
  value?: any;
  type?: string;
  id?: any;
  className?: any;
  placeholder?: string;
  label?: string;
  Icon?: any;
  inputClasses?: any;
}

const TextFieldComponent = ({
  onChange,
  onInput,
  value,
  type,
  id,
  className,
  placeholder,
  label,
  Icon,
  inputClasses,
}: TextFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      type={type || 'text'}
      variant="outlined"
      placeholder={placeholder}
      className={className}
      value={value}
      id={id}
      label={label}
      onChange={onChange}
      onInput={onInput}
      InputProps={{
        startAdornment: Icon ? Icon : null,
        classes: inputClasses
          ? inputClasses
          : {
              notchedOutline: classes.textFieldBorder,
              input: classes.textFieldFont,
            },
      }}
      inputProps={
        type === 'number'
          ? {
              min: 1,
              max: 999,
            }
          : {}
      }
      InputLabelProps={{
        className: classes.textFieldFont,
      }}
    />
  );
};

export default TextFieldComponent;
