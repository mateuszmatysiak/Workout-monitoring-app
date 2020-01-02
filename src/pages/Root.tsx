import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signs from '../components/Signs';
import MainTemplate from 'templates/MainTemplate';

const Root = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <>
            <Route path="/login" component={Signs} />
            <Route path="/register" component={Signs} />
          </>
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
