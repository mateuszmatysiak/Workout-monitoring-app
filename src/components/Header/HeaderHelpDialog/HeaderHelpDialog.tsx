import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '70vw',
  },
  wrapper: {
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
  },
  content: {
    minHeight: 'calc(100vh - 120px)',
  },
  expansionPanelHeader: {
    background: theme.palette.secondary.light,
    color: theme.palette.grey[300],
  },
  expansionPanelContent: {
    background: theme.palette.secondary.main,
    color: theme.palette.grey[300],
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

  const questions = [
    { title: 'Technologie użyte po stronie frontendu', desc: 'React, Typescript' },
    { title: 'Technologie użyte po stronie backendu', desc: 'Nestjs, Typescript' },
  ];

  return (
    <>
      <Tooltip title="FAQ" arrow>
        <IconButton onClick={handleClickOpen}>
          <HelpOutlineIcon className={classes.helpIcon} />
        </IconButton>
      </Tooltip>
      <Dialog
        style={{ zIndex: 1301 }}
        className={classes.root}
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClickClose}
      >
        <div className={classes.wrapper}>
          <DialogTitle className={classes.text}>FAQ</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText className={classes.text}>
              Pytania i odpowiedzi na temat naszej aplikacji.
            </DialogContentText>
            <div className={classes.text}>
              {questions.map(({ title, desc }: any, index: any) => (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.helpIcon} />}
                    className={classes.expansionPanelHeader}
                  >
                    <Typography>{title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelContent}>
                    <Typography>{desc}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </div>
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
