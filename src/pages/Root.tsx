import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';
import Exercises from './Exercises';
import { Provider } from 'react-redux';
import store from '../store';

const Root = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default Root;
