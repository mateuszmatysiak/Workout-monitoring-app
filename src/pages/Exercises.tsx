import React from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/ExercisesTransferList';
import ExercisesStepper from '../components/ExercisesStepper';

const Calendar = () => (
  <SidebarTemplate>
    <ExercisesStepper />
    <ExercisesTransferList />
  </SidebarTemplate>
);

export default Calendar;
