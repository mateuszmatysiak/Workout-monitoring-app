import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../components/Header';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('lg')]: {
      marginLeft: '55px',
    },

    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  content: {
    overflow: 'auto',
    height: '100%',
    maxHeight: 'calc(100vh - 60px)',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,

    [theme.breakpoints.down('xs')]: {
      height: 'unset',
    },
  },
  header: {
    width: '100%',
    height: '60px',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0, .5)',
    opacity: 0,
    transition: 'z-index 0.3s step-end, opacity 0.3s linear',
    zIndex: -999,
  },
  backdropActive: {
    opacity: 1,
    zIndex: 2,
    transition: 'z-index 0.3s step-start, opacity 0.3s linear',
  },
}));

interface SidebarTemplateProps {
  children: any;
}

const SidebarTemplate = ({ children }: SidebarTemplateProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [activeSidebar, setActiveSidebar] = useState(false);
  const handleActiveSidebar = () => setActiveSidebar(!activeSidebar);

  return (
    <div className={classes.page}>
      <Sidebar activeSidebar={activeSidebar} handleActiveSidebar={handleActiveSidebar} />
      <div className={classes.wrapper}>
        <Header activeSidebar={activeSidebar} handleActiveSidebar={handleActiveSidebar} />
        <div className={classes.content}>{children}</div>
      </div>
      {mobile && (
        <div
          onClick={() => handleActiveSidebar()}
          className={clsx(classes.backdrop, activeSidebar && classes.backdropActive)}
        />
      )}
    </div>
  );
};

export default SidebarTemplate;
