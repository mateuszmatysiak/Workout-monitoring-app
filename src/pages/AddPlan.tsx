import React, { useState, useEffect } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import ExercisesTransferList from '../components/AddPlan/TransferList';
import ExercisesStepper from '../components/AddPlan/Stepper';
import SeriesTable from '../components/AddPlan/SeriesTable';
import InfoTable from '../components/AddPlan/InfoTable';
import AddNameToPlan from '../components/AddPlan/AddNameToPlan';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';

const AddPlan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [right, setRight] = useState<any[]>([]);
  const [left, setLeft] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [planName, setPlanName] = useState({ id: '', name: '' });

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3100/exercises')
      .then((res: any) => res.json())
      .then((data: any) => setLeft(data))
      .catch((err: any) => console.log(err))
      .then(() => setLoading(false));
  }, []);
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
        setPlanName={setPlanName}
      />
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
        activeStep === 0 && (
          <ExercisesTransferList
            left={left}
            setLeft={setLeft}
            right={right}
            setRight={setRight}
            setData={setData}
          />
        )
      )}
      {activeStep === 1 && <SeriesTable data={data} setData={setData} />}
      {activeStep === 2 && <InfoTable data={data} setData={setData} />}
      {activeStep === 3 && <AddNameToPlan planName={planName} setPlanName={setPlanName} />}
    </SidebarTemplate>
  );
};

export default AddPlan;
