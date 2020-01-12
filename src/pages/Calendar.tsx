import React, { useState } from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';
import ExercisesCalendar from '../components/ExercisesCalendar';
import ExercisesCalendarSidebar from '../components/ExercisesCalendar/ExercisesCalendarSidebar';

const Calendar = () => {
  const [selectedDays, setSelectedDays] = useState([]) as any[];
  const [data, setData] = useState<any>({
    title: '',
    trainingPlan: [],
    datesFrom: [],
    datesTo: [],
  });
  const [trainingPlanData, setTrainingPlanData] = useState([
    {
      id: 0,
      name: 'P01',
      training: [
        {
          id: 0,
          name: 'Biceps',
          series: [
            {
              id: 0,
              kg: '50',
              time: '1',
              repeat: '5',
            },
            {
              id: 1,
              kg: '50',
              time: '1',
              repeat: '5',
            },
            {
              id: 2,
              kg: '50',
              time: '1',
              repeat: '5',
            },
          ],
        },
        {
          id: 1,
          name: 'Triceps',
          series: [
            {
              id: 0,
              kg: '50',
              time: '1',
              repeat: '5',
            },
            {
              id: 1,
              kg: '50',
              time: '1',
              repeat: '5',
            },
            {
              id: 2,
              kg: '50',
              time: '1',
              repeat: '5',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: 'PPP',
      training: [
        {
          id: 0,
          name: 'Elowina',
          series: [
            {
              id: 0,
              kg: '50',
              time: '1',
              repeat: '5',
            },
          ],
        },
        {
          id: 1,
          name: 'tree',
          series: [
            {
              id: 0,
              kg: '50',
              time: '1',
              repeat: '5',
            },
          ],
        },
      ],
    },
  ]);

  return (
    <SidebarTemplate>
      <ExercisesCalendar selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <ExercisesCalendarSidebar
        data={data}
        setData={setData}
        trainingPlanData={trainingPlanData}
        setSelectedDays={setSelectedDays}
      />
    </SidebarTemplate>
  );
};

export default Calendar;
