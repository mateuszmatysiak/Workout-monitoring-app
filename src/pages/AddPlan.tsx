import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/AddPlan/TransferList';
import ExercisesStepper from '../components/AddPlan/Stepper';
import SeriesTable from '../components/AddPlan/SeriesTable';
import InfoTable from '../components/AddPlan/InfoTable';
import AddNameToPlan from '../components/AddPlan/AddNameToPlan';

const AddPlan = () => {
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
    { id: '', name: '', series: [{ id: '', kg: '', time: '', repeat: '' }] },
  ]);
  const [planName, setPlanName] = useState({ id: '', name: '' });
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
        data={data}
        setData={setData}
        planName={planName}
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
      {activeStep === 1 && <SeriesTable data={data} setData={setData} />}
      {activeStep === 2 && <InfoTable data={data} setData={setData} />}
      {activeStep === 3 && <AddNameToPlan planName={planName} setPlanName={setPlanName} />}
    </SidebarTemplate>
  );
};

export default AddPlan;
