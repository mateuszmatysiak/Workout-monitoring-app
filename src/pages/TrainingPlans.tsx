import React, { useState, useEffect } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import { Chip, Paper, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import WcIcon from '@material-ui/icons/Wc';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import GroupIcon from '@material-ui/icons/Group';
// import strengthTraining from '../assets/silowy.jpg';
// import cardioTraining from '../assets/cardio.jpg';
// import couplesTraining from '../assets/dlaPar.jpg';
// import groupTraining from '../assets/grupowy.jpeg';
// import bikeTraining from '../assets/rower.jpg';
import Training from '../components/TrainingPlans/Training';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '8px 0',
    margin: '16px 16px 0 16px',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    boxShadow: 'unset',
  },
  chip: {
    margin: '4px 8px',
    border: `3px solid transparent`,
    width: '115px',
  },
  chipActive: {
    border: `3px solid #4466df`,
  },
  paper: {
    margin: '16px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.grey[300],
  },
}));

const chips = [
  { id: 0, label: 'Kardio', Icon: <DirectionsRunIcon /> },
  { id: 1, label: 'Siłowy', Icon: <FitnessCenterIcon /> },
  { id: 2, label: 'Dla par', Icon: <WcIcon /> },
  { id: 3, label: 'Rower', Icon: <DirectionsBikeIcon /> },
  { id: 4, label: 'Grupowe', Icon: <GroupIcon /> },
];

const TrainingPlans = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [trainingData, setTrainingData] = useState({
    cardio: [],
    group: [],
    bike: [],
    couples: [],
    strength: [],
  });
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3100/workoutplanexample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: '' }),
    })
      .then((res: any) => res.json())
      .then((data: any) => setTrainingData(data))
      .then(() => setLoading(false));
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState({
    title: '',
    trainingPlan: [],
    dates: [],
  });
  const handleChangePageNumber = (value: number) => setPageNumber(value);

  const addTraining = (value: any[], page: number) =>
    pageNumber === page &&
    value.map(({ id, name, description, img, training }: any) => (
      <Grid key={name} item xs={12} md={6} lg={4}>
        <Training
          id={id}
          title={name}
          description={description}
          img={img}
          training={training}
          data={data}
          setData={setData}
        />
      </Grid>
    ));

  return (
    <SidebarTemplate>
      <Box display="flex">
        <Paper className={classes.root}>
          {chips.map(({ id, label, Icon }: any) => {
            return (
              <Chip
                key={id}
                icon={Icon}
                label={label}
                onClick={() => handleChangePageNumber(id)}
                variant="default"
                className={clsx(classes.chip, pageNumber === id ? classes.chipActive : null)}
              />
            );
          })}
        </Paper>
      </Box>
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
          <Paper className={classes.root}>
            <Grid container spacing={2} style={{ padding: 16 }}>
              {addTraining((trainingData.cardio || []), 0)}
              {addTraining((trainingData.strength || []), 1)}
              {addTraining((trainingData.couples || []), 2)}
              {addTraining((trainingData.bike || []), 3)}
              {addTraining((trainingData.group || []), 4)}
            </Grid>
          </Paper>
        )}
    </SidebarTemplate>
  );
};

export default TrainingPlans;
