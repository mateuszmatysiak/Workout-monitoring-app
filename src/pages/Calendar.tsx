import React, { useState, useEffect } from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';
import ExercisesCalendar from '../components/Calendar';
import CalendarSidebar from '../components/Calendar/CalendarSidebar';
import CalendarDetails from '../components/Calendar/CalendarDetails';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    height: '100%',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const Calendar = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]) as any[];
  const [data, setData] = useState<any>({
    title: '',
    trainingPlan: [],
    dates: selectedDays,
  });
  const [calendarTrainingPlans, setCalendarTrainingPlans] = useState<any>({
    dates: [],
    calendarDates: [],
  });
  const [trainingPlanData, setTrainingPlanData] = useState([]);
  const [fetchTraining, setFetchTraining] = useState([]);
  const [currentTraining, setCurrentTraining] = useState([]) as any;

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: '' }),
    })
      .then((res: any) => res.json())
      .then((data: any) => setTrainingPlanData(data))
      .then(() => setLoading(false));

    fetch('http://localhost:3100/userworkout')
      .then((res: any) => res.json())
      .then(({ dates, calendarDates }: any) =>
        setCalendarTrainingPlans({ dates: dates, calendarDates: calendarDates }),
      );
  }, []);

  const getTrainingPlan = (value: any) => {
    fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: value }),
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        setFetchTraining(data);
        setCurrentTraining(new Array(data[0]));
      });
  };

  return (
    <SidebarTemplate>
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
        <div className={classes.wrapper}>
          <ExercisesCalendar
            selectedDays={data.dates}
            setSelectedDays={setSelectedDays}
            calendarTrainingPlans={calendarTrainingPlans}
            getTrainingPlan={getTrainingPlan}
          />
          <CalendarDetails
            fetchTraining={fetchTraining}
            setFetchTraining={setFetchTraining}
            setCurrentTraining={setCurrentTraining}
            currentTraining={currentTraining}
            setCalendarTrainingPlans={setCalendarTrainingPlans}
          />
          <CalendarSidebar
            data={data}
            setData={setData}
            trainingPlanData={trainingPlanData}
            setSelectedDays={setSelectedDays}
            setCalendarTrainingPlans={setCalendarTrainingPlans}
          />
        </div>
      )}
    </SidebarTemplate>
  );
};

export default Calendar;
