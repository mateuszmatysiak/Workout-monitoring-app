import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    color: theme.palette.grey[300],
  },
  cursor: {
    cursor: 'pointer',
  },
  helpIcon: {
    fill: theme.palette.grey[300],
    fontSize: '28px',
  },
}));

const HeaderHelpDialog = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="FAQ" arrow>
        <IconButton onClick={handleClickOpen}>
          <HelpOutlineIcon className={classes.helpIcon} />
        </IconButton>
      </Tooltip>
      <Dialog fullScreen={fullScreen} open={openDialog} onClose={handleClickClose}>
        <div className={classes.wrapper}>
          <DialogTitle className={classes.text}>FAQ</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              Pytania i odpowiedzi na temat naszej aplikacji.
            </DialogContentText>
            <DialogContentText className={classes.text}>Wkrótce...</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Wyjdź
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default HeaderHelpDialog;
