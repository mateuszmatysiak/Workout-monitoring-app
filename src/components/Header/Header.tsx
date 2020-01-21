import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderHelpDialog from './HeaderHelpDialog';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  title: {
    color: theme.palette.grey[300],
    padding: '0 16px',
    textTransform: 'uppercase',
    fontWeight: 700,
  },
}));

const Header = () => {
  const classes = useStyles();
  const pathName = useLocation().pathname;
  const getTitle = () => {
    switch (pathName) {
      case '/plan-managment':
        return 'Zarządzaj swoimi planami treningowymi';
      case '/calendar':
        return 'Kalendarz';
      case '/training-plans':
        return 'Wybierz plan z przygotowanych przez nas planów treningowych';
      case '/add-exercise':
        return 'Dodaj swoje ćwiczenie';
      default:
        return 'Aplikacja stworzona przez Marcina Musiała i Mateusza Matysiaka';
    }
  };
  return (
    <header className={classes.header}>
      <Typography className={classes.title}>{getTitle()}</Typography>
      <HeaderHelpDialog />
    </header>
  );
};

export default Header;
