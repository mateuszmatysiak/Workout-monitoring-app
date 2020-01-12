import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
  },
  cursor: {
    cursor: 'pointer',
  },
}));

const SignsPanelDialog = () => {
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
      <Link onClick={handleClickOpen} className={classes.cursor}>
        Zapomniałeś hasło?
      </Link>
      <Dialog fullScreen={fullScreen} open={openDialog} onClose={handleClickClose}>
        <div className={classes.wrapper}>
          <DialogTitle className={classes.textFieldFont}>Resetowanie hasła</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.textFieldFont}>
              Aby zresetować hasło, wprowadź poniżej swój adres e-mail lub nazwę użytkownika.
            </DialogContentText>
            <TextField
              onChange={(e: any) => console.log(e.target.value)}
              fullWidth
              label="Wpisz swoją nazwę użytkownika lub email"
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.textFieldBorder,
                  input: classes.textFieldFont,
                },
              }}
              InputLabelProps={{
                className: classes.textFieldFont,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleClickClose} color="primary" autoFocus>
              Resetuj hasło
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default SignsPanelDialog;
