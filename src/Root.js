import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './theme/Theme';
import Signs from './components/Signs';

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Switch>
          <>
            <CssBaseline />
            <Route path="/login" component={Signs} />
            <Route path="/register" component={Signs} />
          </>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
