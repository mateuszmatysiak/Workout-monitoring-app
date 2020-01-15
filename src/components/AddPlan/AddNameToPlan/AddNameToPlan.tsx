import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    maxWidth: '500px',
    marginTop: '16px',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
  },
}));

interface AddNameToPlanProps {
  planName: any;
  setPlanName: any;
}

const AddNameToPlan = ({ planName, setPlanName }: AddNameToPlanProps) => {
  const classes = useStyles();
  return (
    <Box textAlign="center" margin="16px" maxWidth="100%">
      <Typography variant="h5">Podaj nazwę tworzonego planu treningowego</Typography>
      <TextField
        variant="outlined"
        label="Tytuł planu treningowego"
        className={classes.textField}
        onChange={(e: any) => setPlanName({ id: 0, name: e.target.value })}
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
    </Box>
  );
};

export default AddNameToPlan;
