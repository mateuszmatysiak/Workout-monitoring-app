import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderHelpDialog from './HeaderHelpDialog';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <HeaderHelpDialog />
    </div>
  );
};

export default Header;
