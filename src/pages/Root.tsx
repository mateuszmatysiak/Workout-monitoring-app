import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';

const Root = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <>
            <Route path="/login" component={Signs} />
            <Route path="/register" component={Signs} />
            <Route path="/calendar" component={Calendar} />
          </>
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
