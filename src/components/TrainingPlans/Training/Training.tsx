import React, { useState } from 'react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DayPicker from '../../DayPicker';
import TrainingPlanTable from '../../TrainingPlanTable';
import { withSnackbar, WithSnackbarProps } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.grey[300],
    minHeight: '275px',
  },
  img: {
    height: '150px',
  },
  dialogText: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.grey[300],
  },
  dialogContent: {
    backgroundColor: theme.palette.secondary.main,
    padding: '16px 24px',
  },
}));

interface TrainingProps extends WithSnackbarProps {
  id: number;
  img: any;
  title: string;
  description: string;
  training: any;
  data: any;
  setData: (value: any) => void;
  enqueueSnackbar: any;
}

const Training = ({
  id,
  img,
  title,
  description,
  training,
  setData,
  enqueueSnackbar,
}: TrainingProps) => {
  const classes = useStyles({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleAddToCalendar = (data: any) => {
    setData(data);
    setOpenSidebar(false);
    setSelectedDays([]);
    fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() =>
      enqueueSnackbar('Dodano wybrany plan treningowy do kalendarza', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
  };

  const handleClose = () => {
    setSelectedDays([]);
    setData({
      title: '',
      trainingPlan: [],
      dates: [],
    });
    setOpenSidebar(false);
  };

  return (
    <>
      <Paper key={id} className={classes.paper}>
        <CardActionArea onClick={() => setOpenSidebar(true)}>
          <CardMedia component="img" image={img} title={title} className={classes.img} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Paper>
      <Dialog fullScreen={fullScreen} open={openSidebar} onClose={() => setOpenSidebar(false)}>
        <DialogTitle className={classes.dialogText}>{title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText className={classes.dialogText}>{description}</DialogContentText>
          <DayPicker selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
          <TrainingPlanTable data={training} />
        </DialogContent>
        <DialogActions className={classes.dialogContent}>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <Button
            color="primary"
            onClick={() =>
              handleAddToCalendar({ title: title, trainingPlan: training, dates: selectedDays })
            }
          >
            Dodaj do kalendarza
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withSnackbar(Training);
