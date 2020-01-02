import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Typography, List, ListItem, ListItemIcon, Collapse } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({
  navWrapper: {
    height: '33.33%',
    backgroundColor: theme.palette.text.primary,
  },
  navItemWrapper: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0, .1)',
    },

    '&.active': {
      backgroundColor: 'rgba(0,0,0, .1)',
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
    fontSize: '56px',
    transform: 'rotate(-180deg)',
    padding: '12px',
  },
}));

const SidebarNavigation = () => {
  const classes = useStyles();

  const [activeSidebar, setActiveSidebar] = useState(false);
  const handleActiveSidebar = () => setActiveSidebar(!activeSidebar);

  return (
    <>
      <nav className={classes.navWrapper}>
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
            <Typography className={classes.navItem}>Znajdz pracownika</Typography>
          </ListItem>
        </List>
      </nav>
    </>
  );
};

export default SidebarNavigation;
