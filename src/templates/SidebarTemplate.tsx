import React from 'react';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';

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
}));

interface SidebarTemplateProps {
  children: any;
}

const SidebarTemplate = ({ children }: SidebarTemplateProps) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Sidebar />
      <div className={classes.wrapper}>
        <Header />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default SidebarTemplate;
