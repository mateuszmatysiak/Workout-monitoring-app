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
  },
}));

interface TrainingProps {
  id: number;
  img: any;
  title: string;
  description: string;
  training: any;
  data: any;
  setData: any;
}

const Training = ({ id, img, title, description, training, data, setData }: TrainingProps) => {
  const classes = useStyles({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleAddToCalendar = (data: any) => {
    setData(data);
    setOpenSidebar(false);
    setSelectedDays([]);
    // setData({
    //   title: '',
    //   trainingPlan: [],
    //   dates: [],
    // });
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
              handleAddToCalendar({ name: title, trainingPlan: training, dates: selectedDays })
            }
          >
            Dodaj do kalendarza
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Training;
