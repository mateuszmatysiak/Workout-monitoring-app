import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    boxShadow: 'unset',
    color: theme.palette.grey[700],
    zIndex: 1301,
    backgroundColor: `${theme.palette.grey.A100}`,
  },
}));

interface CalendarSideButtonProps {
  openSidebar: boolean;
  setOpenSidebar: (value: any) => void;
}

const CalendarSideButton = ({ openSidebar, setOpenSidebar }: CalendarSideButtonProps) => {
  const classes = useStyles();

  const handleOpenSidebar = () => setOpenSidebar({ right: true });
  const handleCloseSidebar = () => setOpenSidebar({ right: false });

  return (
    <Fab onClick={openSidebar ? handleCloseSidebar : handleOpenSidebar} className={classes.root}>
      {openSidebar ? <CloseIcon /> : <AddIcon />}
    </Fab>
  );
};

export default CalendarSideButton;
