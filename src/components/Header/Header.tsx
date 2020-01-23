import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderHelpDialog from './HeaderHelpDialog';
import { Typography, ListItem, ListItemIcon, Box } from '@material-ui/core';
import { useLocation, NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

    [theme.breakpoints.down('xs')]: {
      fontSize: '8px',
    },
  },
  navItemWrapper: {
    width: 'unset',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0, .1)',
    },
  },
  navItem: {
    marginLeft: '16px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['300'],
  },
  navIconWrapper: {
    minWidth: 0,
  },
  exitIcon: {
    color: theme.palette.grey['300'],
    fontSize: '24px',
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
      case '/exercise-managment':
        return 'Zarządzaj swoimi ćwiczeniami';
      default:
        return 'Aplikacja stworzona przez Marcina Musiała i Mateusza Matysiaka';
    }
  };
  return (
    <header className={classes.header}>
      <Typography className={classes.title}>{getTitle()}</Typography>
      <Box display="flex" marginRight="8px">
        <HeaderHelpDialog />
        <ListItem component={NavLink} to="/login" className={classes.navItemWrapper}>
          <ListItemIcon className={classes.navIconWrapper}>
            <ExitToAppIcon className={classes.exitIcon} />
          </ListItemIcon>
          <Typography className={classes.navItem}>Wyloguj</Typography>
        </ListItem>
      </Box>
    </header>
  );
};

export default Header;
