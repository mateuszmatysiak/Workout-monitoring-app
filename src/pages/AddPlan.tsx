import React, { useState, useEffect } from 'react';
import SidebarTemplate from '../templates/SidebarTemplate';
import TransferList from '../components/AddPlan/TransferList';
import Stepper from '../components/AddPlan/Stepper';
import SeriesTable from '../components/AddPlan/SeriesTable';
import InfoTable from '../components/AddPlan/InfoTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';

const AddPlan = (props: any) => {
  const { enqueueSnackbar } = props;
  const [data, setData] = useState([]);
  const [left, setLeft] = useState<any[]>([]);
  const [right, setRight] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [planName, setPlanName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3100/exercises')
      .then((res: any) => res.json())
      .then((data: any) => setLeft(data))
      .catch((err: any) => console.log(err))
      .then(() => setLoading(false));
  }, []);

  const addPlan = () => {
    fetch('http://localhost:3100/workoutplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data[0]),
    }).then(() =>
      enqueueSnackbar(`Dodano plan treningowy o nazwie: ${planName}`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
  };

  return (
    <SidebarTemplate>
      <Stepper
        data={data}
        setData={setData}
        left={left}
        setLeft={setLeft}
        right={right}
        setRight={setRight}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        addPlan={addPlan}
        planName={planName}
        setPlanName={setPlanName}
      />
      {loading ? (
        <Box textAlign="center" margin="16px">
          <CircularProgress />
        </Box>
      ) : (
        activeStep === 0 && (
          <TransferList
            left={left}
            setLeft={setLeft}
            right={right}
            setRight={setRight}
            setData={setData}
            planName={planName}
            setPlanName={setPlanName}
          />
        )
      )}
      {activeStep === 1 && <SeriesTable data={data} setData={setData} />}
      {activeStep === 2 && <InfoTable data={data} setData={setData} />}
    </SidebarTemplate>
  );
};

export default withSnackbar(AddPlan);
