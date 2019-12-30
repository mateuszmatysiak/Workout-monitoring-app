import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './theme/Theme';

const Root = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      Strona główna
    </ThemeProvider>
  );
};

export default Root;
