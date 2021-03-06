import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme } from '../theme/Theme';

interface MainTemplateProps {
  children: any;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default MainTemplate;
