import React from 'react';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import classes from '*.module.css';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
  },
  wrapper: {
    width: '100%',
  },
  content: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    padding: '16px',
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
        <div className={classes.header}></div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default SidebarTemplate;
