import React, { useState } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/AddPlan/TransferList';
import ExercisesStepper from '../components/AddPlan/Stepper';
import ExercisesSeriesTable from '../components/AddPlan/SeriesTable';
import ExercisesInfoTable from '../components/AddPlan/InfoTable';

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
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'aa',
    'bb',
    'cc',
    'dd',
    'ee',
    'ff',
    'aaa',
    'bbb',
    'ccc',
    'ddd',
    'eee',
    'fff',
    'aaaa',
    'bbbb',
    'cccc',
    'dddd',
    'eeee',
    'ffff',
  ]);
  const [data, setData] = useState([
    { id: '', name: '', series: [{ id: '', kg: '', time: '', repeat: '' }] },
  ]);
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

export default AddPlan;
