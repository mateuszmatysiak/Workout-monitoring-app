import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Box, Tooltip } from '@material-ui/core';
import TrainingPlanTable from '../../TrainingPlanTable';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '../../Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import { withSnackbar, WithSnackbarProps } from 'notistack';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: '100%',
  },
  content: {
    backgroundColor: '#212121',
    borderRadius: '5px',
    margin: '16px',
    width: '100%',
    overflow: 'overlay',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '8px',
  },
  title: {
    padding: '16px',
  },
  subtitle: {
    paddingBottom: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    fill: theme.palette.grey[300],
  },
  disabledIcon: {
    fill: theme.palette.secondary.main,
  },
  item: {
    padding: '8px 0',
    margin: '16px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    whiteSpace: 'nowrap',
    overflow: 'auto',
    textOverflow: 'ellipsis',
  },
  tableWrapper: {
    margin: '16px',
    borderRadius: '5px',
  },
  textFieldWrapper: {
    margin: '16px',
  },
  dates: {
    height: '100px',
    overflow: 'auto',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
  },
  helperText: {
    color: `${theme.palette.error.main} !important`,
  },
}));

interface CalendarDetailsProps extends WithSnackbarProps {
  fetchTraining: any;
  currentTraining: any;
  setCurrentTraining: (value: any) => void;
  setCalendarTrainingPlans: (value: any) => void;
  setFetchTraining: (value: any) => void;
  enqueueSnackbar: any;
}

const CalendarDetails = ({
  fetchTraining,
  currentTraining,
  setCurrentTraining,
  setCalendarTrainingPlans,
  setFetchTraining,
  enqueueSnackbar,
}: CalendarDetailsProps) => {
  const classes = useStyles();
  const [currentTrainingId] = (currentTraining || []).map(({ id }: any) => id);

  async function handleDeleteTraining(value: any) {
    await fetch('http://localhost:3100/userworkout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: value }),
    })
      .then(() => {
        setCurrentTraining([]);
        setFetchTraining(fetchTraining.filter((item: any) => item.id !== value));
      })
      .then(() =>
        enqueueSnackbar('Usunięto plan', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      );
    await fetch('http://localhost:3100/userworkout')
      .then((res: any) => res.json())
      .then(({ dates, calendarDates }: any) =>
        setCalendarTrainingPlans({ dates: dates, calendarDates: calendarDates }),
      );
  }

  const clearPickedTraining = () => {
    setFetchTraining([]);
    setCurrentTraining([]);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <header className={classes.header}>
          <Typography className={classes.title} variant="h5">
            Szczegóły treningu
          </Typography>
          <Box display="flex">
            <Tooltip title="Wyczyść pobraną liste treningów">
              <span>
                <IconButton disabled={!fetchTraining.length} onClick={() => clearPickedTraining()}>
                  <ClearIcon
                    className={clsx(classes.icon, !fetchTraining.length && classes.disabledIcon)}
                  />
                </IconButton>
              </span>
            </Tooltip>
            <Dialog
              children="Czy na pewno chcesz usunąć plan treningowy z kalendarza? Czynność ta jest nieodwracalna!"
              tooltipTitle="Usuń plan z kalendarza"
              dialogTitle="Usuń plan treningowy z kalendarza"
              buttonName="Usuń"
              deleteDialog
              dialogFunc={() => handleDeleteTraining(currentTrainingId)}
              Icon={
                <DeleteIcon
                  className={clsx(classes.icon, !currentTraining.length && classes.disabledIcon)}
                />
              }
              disabled={!currentTraining.length}
            />
          </Box>
        </header>
        <div className={classes.textFieldWrapper}>
          <TextField
            variant="outlined"
            disabled={!fetchTraining.length ? true : false}
            select
            label="Wybierz trening"
            helperText={
              !currentTraining.length
                ? 'Kliknij na interesujący Cię dzień, aby pobrać szczegółowy opis treningu.'
                : null
            }
            fullWidth
            value={currentTrainingId || ''}
            onChange={(e: any) =>
              setCurrentTraining(fetchTraining.filter((item: any) => item.id === e.target.value))
            }
            InputProps={{
              classes: {
                notchedOutline: classes.textFieldBorder,
                input: classes.textFieldFont,
              },
            }}
            InputLabelProps={{
              className: classes.textFieldFont,
            }}
            FormHelperTextProps={{
              className: classes.helperText,
            }}
          >
            {fetchTraining.map(({ title, id }: any, index: any) => (
              <MenuItem key={index} value={id}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <main>
          {currentTraining.map(({ title, trainingPlan, dates }: any, index: any) => {
            const allDates = dates.map((item: any) => item);
            return (
              <div key={index}>
                <div className={classes.item}>
                  <Typography variant="body2">Tytuł</Typography>
                  <Typography variant="h6">{title}</Typography>
                </div>
                <div className={classes.item}>
                  <Typography variant="body2">Daty</Typography>
                  <div className={classes.dates}>
                    {allDates.map((date: any, index: any) => (
                      <Typography key={index} variant="h6">
                        {date.substr(0, 10)}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={classes.tableWrapper}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2">Plan treningowy</Typography>
                    <Typography className={classes.subtitle} variant="h6">
                      {trainingPlan.name}
                    </Typography>
                  </Box>
                  <TrainingPlanTable data={trainingPlan.training} />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default withSnackbar(CalendarDetails);
