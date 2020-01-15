import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import { Chip, Paper, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import WcIcon from '@material-ui/icons/Wc';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import GroupIcon from '@material-ui/icons/Group';
import strengthTraining from '../assets/silowy.jpg';
import cardioTraining from '../assets/cardio.jpg';
import couplesTraining from '../assets/dlaPar.jpg';
import groupTraining from '../assets/grupowy.jpeg';
import bikeTraining from '../assets/rower.jpg';
import Training from '../components/TrainingPlans/Training';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '8px 0',
    margin: '16px 16px 0 16px',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
  },
  chip: {
    margin: '4px 8px',
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

const training = {
  strength: [
    {
      id: 0,
      title: 'Trening siłowy',
      description: 'Zdobądź swoją mase mięśniową z naszym treningiem',
      img: strengthTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
  ],
  cardio: [
    {
      id: 0,
      title: 'Trening kardio',
      description: 'Spal zbędne kilogramy z naszym planem treningowym',
      img: cardioTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Trening na spalenie kalorii',
      description: 'Testowy opis na spalanie kalorii',
      img: cardioTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
  ],
  couples: [
    {
      id: 0,
      title: 'Trening dla par',
      description: 'Ćwicząc razem spalacie więcej kalorii',
      img: couplesTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
  ],
  group: [
    {
      id: 0,
      title: 'Trening dla grup',
      description: 'W grupie raźniej',
      img: groupTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
  ],
  bike: [
    {
      id: 0,
      title: 'Trening dla rowerzystów',
      description: 'Pedałuj z nami',
      img: bikeTraining,
      training: [
        {
          id: 0,
          name: 'Bieganie',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
        {
          id: 1,
          name: 'Ab roller na kolanach',
          series: [
            { id: 0, kg: '1', time: '15', repeat: '1' },
            { id: 1, kg: '1', time: '15', repeat: '1' },
          ],
        },
      ],
    },
  ],
};

const TrainingPlans = () => {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState({
    title: '',
    trainingPlan: [],
    dates: [],
  });
  const handleChangePageNumber = (value: number) => setPageNumber(value);
  const addTraining = (value: any[], page: number) =>
    pageNumber === page &&
    value.map(({ id, title, description, img, training }: any) => (
      <Grid key={id} item xs={12} md={6} lg={4}>
        <Training id={id} title={title} description={description} img={img} training={training} data={data} setData={setData} />
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
                className={classes.chip}
              />
            );
          })}
        </Paper>
      </Box>
      <Paper className={classes.root}>
        <Grid container spacing={2} style={{ padding: 16 }}>
          {addTraining(training.cardio, 0)}
          {addTraining(training.strength, 1)}
          {addTraining(training.couples, 2)}
          {addTraining(training.bike, 3)}
          {addTraining(training.group, 4)}
        </Grid>
      </Paper>
    </SidebarTemplate>
  );
};

export default TrainingPlans;
