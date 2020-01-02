import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Typography, List, ListItem, ListItemIcon, Collapse, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(theme => ({
  navWrapper: {
    minHeight: '100vh',
    width: '200px',
    backgroundColor: theme.palette.secondary.main,
    borderRight: `1px solid ${theme.palette.grey[700]}`,
  },
  navItemWrapper: {
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, .1)',
    },

    '&.active': {
      backgroundColor: 'rgba(255,255,255, .1)',
    },
  },
  navItem: {
    width: '100%',
    marginLeft: '16px',
    fontSize: '12px',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['300'],
  },
  navIconWrapper: {
    minWidth: 0,
  },
  navIcon: {
    color: theme.palette.grey['300'],
    fontSize: '18px',
  },
  exitIcon: {
    color: theme.palette.grey['300'],
    transform: 'rotate(-180deg)',
    fontSize: '18px',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '60px',
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    paddingRight: '4px',
  },
  headerIcon: {
    fill: theme.palette.grey[300],
  },
}));

const SidebarNavigation = () => {
  const classes = useStyles();

  const [activeSidebar, setActiveSidebar] = useState(false);
  const handleActiveSidebar = () => setActiveSidebar(!activeSidebar);

  return (
    <>
      <nav className={classes.navWrapper}>
        <header className={classes.headerWrapper}>
          <IconButton>
            <NavigateBeforeIcon className={classes.headerIcon} />
          </IconButton>
        </header>
        <List>
          <ListItem component={NavLink} to="/calendar" className={classes.navItemWrapper}>
            <ListItemIcon className={classes.navIconWrapper}>
              <CalendarTodayIcon className={classes.navIcon} />
            </ListItemIcon>
            <Typography className={classes.navItem}>Kalendarz</Typography>
          </ListItem>
          <ListItem component={NavLink} to="/login" className={classes.navItemWrapper}>
            <ListItemIcon className={classes.navIconWrapper}>
              <ExitToAppIcon className={classes.exitIcon} />
            </ListItemIcon>
            <Typography className={classes.navItem}>Wyloguj</Typography>
          </ListItem>
        </List>
      </nav>
    </>
  );
};

export default SidebarNavigation;
