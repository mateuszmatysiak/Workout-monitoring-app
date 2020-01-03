import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/ExercisesTransferList';
import ExercisesStepper from '../components/ExercisesStepper';
import ExercisesSeriesTable from '../components/ExercisesSeriesTable';
import ExercisesInfoTable from '../components/ExercisesInfoTable';

const Exercises = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <SidebarTemplate>
      <ExercisesStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {activeStep === 0 && <ExercisesTransferList />}
      {activeStep === 1 && <ExercisesSeriesTable />}
      {activeStep === 2 && <ExercisesInfoTable />}
    </SidebarTemplate>
  );
};

export default Exercises;
