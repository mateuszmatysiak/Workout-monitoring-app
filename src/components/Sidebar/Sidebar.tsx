import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Typography, List, ListItem, ListItemIcon, IconButton, Tooltip } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  navWrapper: {
    minHeight: '100vh',
    minWidth: '55px',
    width: '55px',
    backgroundColor: theme.palette.secondary.main,
    borderRight: `1px solid ${theme.palette.grey[700]}`,
    overflow: 'hidden',
    transition: theme.transitions.create(['margin', 'width', 'transform'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
    zIndex: 3,
    [theme.breakpoints.down('lg')]: {
      position: 'fixed',
      top: 0,
      left: 0,
    },

    [theme.breakpoints.down('xs')]: {
      transform: 'translateX(-55px)',
    },
  },
  navWrapperActive: {
    width: '275px',

    [theme.breakpoints.down('xs')]: {
      width: '55px',
      transform: 'translateX(0)',
    },
  },
  navItemWrapper: {
    padding: '16px',
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
    whiteSpace: 'nowrap',
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['300'],
  },
  navIconWrapper: {
    minWidth: 0,
  },
  navIcon: {
    color: theme.palette.grey['300'],
  },
  exitIcon: {
    color: theme.palette.grey['300'],
    transform: 'rotate(-180deg)',
    fontSize: '22px',
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

interface SidebarProps {
  activeSidebar: boolean;
  handleActiveSidebar: () => void;
}

const Sidebar = ({ activeSidebar, handleActiveSidebar }: SidebarProps) => {
  const classes = useStyles();

  const menuItems = [
    {
      path: '/calendar',
      title: 'Kalendarz',
      Icon: <CalendarTodayIcon className={classes.navIcon} />,
    },
    {
      path: '/plan-managment',
      title: 'Zarządzanie planami',
      Icon: <AssignmentIcon className={classes.navIcon} />,
    },
    {
      path: '/training-plans',
      title: 'Gotowe plany treningowe',
      Icon: <DashboardIcon className={classes.navIcon} />,
    },
    {
      path: '/exercise-managment',
      title: 'Zarządzanie ćwiczeniami',
      Icon: <FitnessCenterIcon className={classes.navIcon} />,
    },
  ];

  const NavIconButton = () =>
    activeSidebar ? (
      <NavigateBeforeIcon className={classes.headerIcon} />
    ) : (
      <MenuIcon className={classes.headerIcon} />
    );

  return (
    <>
      <nav className={clsx(classes.navWrapper, activeSidebar && classes.navWrapperActive)}>
        <header className={classes.headerWrapper}>
          <IconButton onClick={handleActiveSidebar}>
            <NavIconButton />
          </IconButton>
        </header>
        <List>
          {menuItems.map(({ path, title, Icon }: any) => (
            <ListItem key={path} component={NavLink} to={path} className={classes.navItemWrapper}>
              <ListItemIcon className={classes.navIconWrapper}>
                <Tooltip title={title}>{Icon}</Tooltip>
              </ListItemIcon>
              <Typography className={classes.navItem}>{title}</Typography>
            </ListItem>
          ))}
        </List>
      </nav>
    </>
  );
};

export default Sidebar;
