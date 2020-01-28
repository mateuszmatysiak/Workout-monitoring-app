import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HeaderHelpDialog from './HeaderHelpDialog';
import {
  Typography,
  ListItem,
  ListItemIcon,
  Box,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import { useLocation, NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';

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
      fontSize: '12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
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
  headerIcon: {
    fill: theme.palette.grey[300],
  },
}));

interface HeaderProps {
  activeSidebar: boolean;
  handleActiveSidebar: () => void;
}

const Header = ({ activeSidebar, handleActiveSidebar }: HeaderProps) => {
  const classes = useStyles();
  const pathName = useLocation().pathname;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
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

  const NavIconButton = () =>
    activeSidebar ? (
      <NavigateBeforeIcon className={classes.headerIcon} />
    ) : (
      <MenuIcon className={classes.headerIcon} />
    );

  return (
    <header className={classes.header}>
      {mobile && (
        <IconButton onClick={handleActiveSidebar}>
          <NavIconButton />
        </IconButton>
      )}
      <Typography className={classes.title}>{getTitle()}</Typography>
      <Box display="flex" marginRight="8px">
        <HeaderHelpDialog />
        <ListItem
          component={NavLink}
          onClick={() => localStorage.removeItem('token')}
          to="/login"
          className={classes.navItemWrapper}
        >
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
