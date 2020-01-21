import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import AddPlan from '../components/AddPlan';
import MyPlans from '../components/MyPlans';
import { Button, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    margin: '16px',
    padding: '16px',
  },
  button: {
    '&:nth-child(2)': {
      marginLeft: '16px',
    },
  },
}));

const buttons = [
  { id: 0, name: 'Moje plany treningowe' },
  { id: 1, name: 'Dodaj plan treningowy' },
];

const PlanManagment = (props: any) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);

  const handleChangePageNumber = (value: any) => setPageNumber(value);

  return (
    <SidebarTemplate>
      <Box display="flex">
        <Paper className={classes.paper}>
          {buttons.map(({ id, name }: any) => (
            <Button
              key={id}
              value="1"
              color="primary"
              variant={id === pageNumber ? 'contained' : 'text'}
              className={classes.button}
              onClick={(e: any) => handleChangePageNumber(id)}
            >
              {name}
            </Button>
          ))}
        </Paper>
      </Box>
      {pageNumber === 0 && <MyPlans />}
      {pageNumber === 1 && <AddPlan />}
    </SidebarTemplate>
  );
};

export default PlanManagment;
