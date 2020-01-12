import React, { useState } from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';
import ExercisesCalendar from '../components/ExercisesCalendar';
import ExercisesCalendarSidebar from '../components/ExercisesCalendar/ExercisesCalendarSidebar';

const Calendar = () => {
  const [selectedDays, setSelectedDays] = useState([]) as any[];
  const [data, setData] = useState<any>({
    title: '',
    trainingPlan: 'P01',
    datesFrom: [],
    datesTo: [],
  });

  console.log(data);
  console.log(selectedDays);
  return (
    <SidebarTemplate>
      <ExercisesCalendar selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <ExercisesCalendarSidebar data={data} setData={setData} setSelectedDays={setSelectedDays} />
    </SidebarTemplate>
  );
};

export default Calendar;
