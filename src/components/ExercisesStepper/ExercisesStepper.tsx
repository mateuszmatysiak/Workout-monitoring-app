import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Check from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.dark,
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepLabel: {
    color: 'red',
  },
}));
const getSteps = () => [
  'Wybierz swoje ćwiczenia',
  'Ustal ilość serii dla wybranych ćwiczeń',
  'Ustal ilość powtórzeń oraz kilogramów dla danej serii',
];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return 'Wybieranie ćwiczeń...';
    case 1:
      return 'Ustalanie serii dla danego ćwiczenia...';
    case 2:
      return 'Ustalanie ilści powtórzeń oraz kilgramów dla danej serii...';
    default:
      return 'Nieznany krok';
  }
};

const ExercisesStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const customStepStyles = makeStyles(theme => ({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    circle: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[300],
    },
    completed: {
      color: theme.palette.grey[300],
      zIndex: 1,
      fontSize: 18,
    },
  }));

  const CustomStepIcon = (props: StepIconProps) => {
    const classes = customStepStyles();
    const { completed } = props;

    return (
      <div className={classes.root}>
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel className={classes.root} activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <Box color="#e0e0e0">{label}</Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Box textAlign="center" padding="0 16px 16px 16px">
            <Typography className={classes.instructions}>Wszystkie kroki ukończone</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Zresetuj
            </Button>
          </Box>
        ) : (
          <Box textAlign="center" padding="0 16px 16px 16px">
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Cofnij
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Koniec' : 'Następny'}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default ExercisesStepper;
