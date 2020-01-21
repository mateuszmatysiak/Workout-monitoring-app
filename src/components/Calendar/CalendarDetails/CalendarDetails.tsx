import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TrainingPlanTable from '../../TrainingPlanTable';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '../../Dialog';
import DeleteIcon from '@material-ui/icons/Delete';

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
    padding: '16px 0',
  },
  icon: {
    fill: theme.palette.grey[300],
  },
  item: {
    padding: '8px 0',
    margin: '16px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
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

const CalendarDetails = () => {
  const classes = useStyles();

  const [fetchTraining, setFetchTraining] = useState([
    {
      name: 'Na jeszcze coś tam',
      training: [
        {
          id: 111,
          name: 'Tabaka',
          series: [
            {
              id: 0,
              repeat: 1,
              time: 5,
            },
            {
              id: 1,
              repeat: 1,
              time: 5,
            },
          ],
        },
        {
          id: 1111,
          name: 'Rzut ręcznikiem',
          series: [
            {
              id: 0,
              repeat: 3,
              kg: 20,
            },
            {
              id: 1,
              repeat: 3,
              kg: 20,
            },
          ],
        },
        {
          id: 11111,
          name: 'Rzut ręcznikiem',
          series: [
            {
              id: 0,
              repeat: 3,
              kg: 20,
            },
            {
              id: 1,
              repeat: 3,
              kg: 20,
            },
          ],
        },
        {
          id: 11111,
          name: 'Rzut ręcznikiem',
          series: [
            {
              id: 0,
              repeat: 3,
              kg: 20,
            },
            {
              id: 1,
              repeat: 3,
              kg: 20,
            },
          ],
        },
        {
          id: 11111,
          name: 'Rzut ręcznikiem',
          series: [
            {
              id: 0,
              repeat: 3,
              kg: 20,
            },
            {
              id: 1,
              repeat: 3,
              kg: 20,
            },
          ],
        },
      ],
      dates: [
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        ,
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        ,
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
      ],
    },
    {
      name: 'test',
      training: [
        {
          id: 222,
          name: 'Cwiczenie2',
          series: [
            {
              id: 0,
              repeat: 1,
              time: 5,
            },
            {
              id: 1,
              repeat: 1,
              time: 5,
            },
          ],
        },
        {
          id: 2222,
          name: 'Cwiczenie222',
          series: [
            {
              id: 0,
              repeat: 3,
              kg: 20,
            },
            {
              id: 1,
              repeat: 3,
              kg: 20,
            },
          ],
        },
      ],
      dates: ['2019-07-04', '2019-07-22', '2019-07-06'],
    },
  ]);
  const [currentTraining, setCurrentTraining] = useState([]) as any;

  const [selectTraining] = (currentTraining || []).map((item: any) => item.name);

  const handleDeleteTraining = () => console.log('Usunięto');

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <header className={classes.header}>
          <Typography className={classes.title} variant="h5">
            Szczegóły treningu
          </Typography>
          <Dialog
            children="Czy na pewno chcesz usunąć plan treningowy z kalendarza? Czynność ta jest nieodwracalna!"
            tooltipTitle="Usuń plan z kalendarza"
            dialogTitle="Usuń plan treningowy z kalendarza"
            buttonName="Usuń"
            deleteDialog
            dialogFunc={handleDeleteTraining}
            Icon={<DeleteIcon className={classes.icon} />}
          />
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
            value={selectTraining || ''}
            onChange={(e: any) =>
              setCurrentTraining(fetchTraining.filter((item: any) => item.name === e.target.value))
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
            {fetchTraining.map(({ name }: any) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <main>
          {currentTraining.map(({ name, training, dates }: any, index: any) => {
            const allDates = dates.map((item: any) => item);
            return (
              <div key={index}>
                <div className={classes.item}>
                  <Typography variant="body2">Tytuł</Typography>
                  <Typography variant="h6">{name}</Typography>
                </div>
                <div className={classes.item}>
                  <Typography variant="body2">Daty</Typography>
                  <div className={classes.dates}>
                    {allDates.map((date: any, index: any) => (
                      <Typography key={index} variant="h6">
                        {date}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={classes.tableWrapper}>
                  <Typography className={classes.subtitle} variant="body2">
                    Plan treningowy
                  </Typography>
                  <TrainingPlanTable data={training} />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default CalendarDetails;
