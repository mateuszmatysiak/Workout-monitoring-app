import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, useMediaQuery } from '@material-ui/core';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Check from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      height: '400px',
      alignItems: 'center',
    },
  },
  step: {
    [theme.breakpoints.down('xs')]: {
      overflow: 'hidden',
    },
  },
}));

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
      return 'Ustalanie ilości powtórzeń oraz kilogramów dla danej serii...';
    default:
      return 'Nieznany krok';
  }
};

interface ExercisesStepperProps {
  activeStep: number;
  setActiveStep: (value: any) => void;
  right: string[];
  left: string[];
  setLeft: (value: any) => void;
  setRight: (value: any[]) => void;
  data: any[];
  setData: (value: any) => void;
  addPlan: () => void;
  planName: string;
  setPlanName: (value: string) => void;
}

const ExercisesStepper = ({
  activeStep,
  setActiveStep,
  right,
  left,
  setLeft,
  setRight,
  setData,
  addPlan,
  planName,
  setPlanName,
}: ExercisesStepperProps) => {
  const classes = useStyles();
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 2) {
      addPlan();
      setPlanName('');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
    setLeft(left.filter((value: any) => right.indexOf(value) === -1));
    if (activeStep === 1) {
      setLeft(left.concat(right));
      setRight([]);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setLeft(left.concat(right));
    setRight([]);
    setData([]);
  };

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
      <Stepper
        orientation={mobile ? 'vertical' : 'horizontal'}
        alternativeLabel
        className={classes.stepper}
        activeStep={activeStep}
      >
        {steps.map((label: any) => {
          return (
            <Step key={label} className={classes.step}>
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
            <Typography className={classes.instructions}>Stworzono plan treningowy</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Stwórz nowy plan treningowy
            </Button>
          </Box>
        ) : (
          <Box textAlign="center" padding="0 16px 16px 16px">
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Cofnij
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={
                  activeStep === steps.length - 1
                    ? false
                    : right.length === 0 || planName.length === 0
                }
              >
                {activeStep === steps.length - 1 ? 'Zapisz' : 'Następny'}
              </Button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default ExercisesStepper;
