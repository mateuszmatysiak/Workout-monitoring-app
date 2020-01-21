import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip, Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: '70vw',
    maxWidth: 'unset',
  },
  wrapper: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
  },
  text: {
    color: theme.palette.grey[300],
  },
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[300],
    padding: '24px 24px 8px 24px',
    zIndex: 3,
  },
  footer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.secondary.main,
    padding: '16px',
    zIndex: 2,
  },
  error: {
    color: theme.palette.error.main,
  },
  cursor: {
    cursor: 'pointer',
  },
}));

interface DialogProps {
  dialogFunc?: any;
  tooltipTitle?: string;
  dialogTitle?: string;
  children?: any;
  buttonName?: string;
  Icon?: any;
  deleteDialog?: boolean;
  onlyOneButton?: boolean;
  bigDialog?: boolean;
}

const DialogComponent = ({
  dialogFunc,
  tooltipTitle,
  dialogTitle,
  children,
  buttonName,
  Icon,
  deleteDialog,
  onlyOneButton,
  bigDialog,
}: DialogProps) => {
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

  const handleDialogFunction = () => {
    dialogFunc();
    setOpenDialog(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Tooltip title={tooltipTitle}>
          <IconButton onClick={handleClickOpen}>{Icon}</IconButton>
        </Tooltip>
      </Box>
      <Dialog
        PaperProps={{ className: bigDialog ? classes.dialog : '' }}
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClickClose}
      >
        <div className={classes.wrapper}>
          <DialogTitle className={clsx(classes.header, deleteDialog && classes.error)}>
            {dialogTitle}
          </DialogTitle>
          <DialogContent className={classes.text}>{children}</DialogContent>
          <DialogActions className={classes.footer}>
            {onlyOneButton ? null : (
              <Button onClick={handleDialogFunction} color="primary">
                {buttonName}
              </Button>
            )}
            <Button onClick={handleClickClose} color="primary">
              Anuluj
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default DialogComponent;
