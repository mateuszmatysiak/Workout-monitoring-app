import React, { useState, useEffect } from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';
import ExercisesCalendar from '../components/Calendar';
import CalendarSidebar from '../components/Calendar/CalendarSidebar';

const Calendar = () => {
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

  return (
    <SidebarTemplate>
      <ExercisesCalendar
        selectedDays={data.dates}
        setSelectedDays={setSelectedDays}
        calendarTrainingPlans={calendarTrainingPlans}
        loading={loading}
      />
      <CalendarSidebar
        data={data}
        setData={setData}
        trainingPlanData={trainingPlanData}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        setCalendarTrainingPlans={setCalendarTrainingPlans}
      />
    </SidebarTemplate>
  );
};

export default Calendar;
