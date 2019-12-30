import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '1000px',
  },
  cursor: {
    cursor: 'pointer',
  },
}));

const SignsDialog = () => {
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
    <div>
      <Typography className={classes.cursor} variant="body2" onClick={handleClickOpen}>
        Zapomniałeś hasło?
      </Typography>
      <Dialog fullScreen={fullScreen} open={openDialog} onClose={handleClickClose}>
        <DialogTitle>Resetowanie hasła</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aby zresetować hasło, wprowadź poniżej swój adres e-mail lub nazwę użytkownika.
          </DialogContentText>
          <TextField fullWidth label="Wpisz swoją nazwę użytkownika lub email" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleClickClose} color="primary" autoFocus>
            Resetuj hasło
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignsDialog;
