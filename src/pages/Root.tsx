import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';
import Exercises from './Exercises';

const Root = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <>
            <Route path="/login" component={Signs} />
            <Route path="/register" component={Signs} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/exercises" component={Exercises} />
          </>
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
