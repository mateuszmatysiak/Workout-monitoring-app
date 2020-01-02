import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme } from '../theme/Theme';

interface MainTemplateProps {
  children: any;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default MainTemplate;
