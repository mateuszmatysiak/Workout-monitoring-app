import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './theme/Theme';
import Signs from './components/Signs';

const Root = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Signs />
    </ThemeProvider>
  );
};

export default Root;
