import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/ExercisesTransferList';
import ExercisesStepper from '../components/ExercisesStepper';
import ExercisesSeriesTable from '../components/ExercisesSeriesTable';
import ExercisesInfoTable from '../components/ExercisesInfoTable';

const Exercises = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [right, setRight] = useState<any[]>([]);
  const [left, setLeft] = useState<any[]>([
    'Biceps',
    'Triceps',
    'Wznosy bokiem',
    'Wyciskanie żołnierskie',
    'Wyciskanie leżąc',
    'Podciąganie',
    'Szwedki',
    'Pompki',
    'Ab roller na kolanach',
    'Unoszenie prostych nóg do drążka',
    'Rewersy',
    'Scyzoryk',
    'Dead bug - nogi proste',
    'Hollow body',
    'Semi hollow body',
  ]);
  const [data, setData] = useState([
    { id: '', name: '', series: [{ nr: '', kg: '', time: '', repeat: '' }] },
  ]);
  console.log(data);
  return (
    <SidebarTemplate>
      <ExercisesStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        right={right}
        left={left}
        setLeft={setLeft}
        setRight={setRight}
      />
      {activeStep === 0 && (
        <ExercisesTransferList
          left={left}
          setLeft={setLeft}
          right={right}
          setRight={setRight}
          setData={setData}
        />
      )}
      {activeStep === 1 && <ExercisesSeriesTable data={data} setData={setData} />}
      {activeStep === 2 && <ExercisesInfoTable data={data} setData={setData} />}
    </SidebarTemplate>
  );
};

export default Exercises;
