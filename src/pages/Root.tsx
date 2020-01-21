import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';
import PlanManagment from './PlanManagment';
import AddExercise from './AddExercise';
import TrainingPlans from './TrainingPlans';
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
              <Route path="/plan-managment" component={PlanManagment} />
              <Route path="/add-exercise" component={AddExercise} />
              <Route path="/training-plans" component={TrainingPlans} />
            </>
          </Switch>
        </MainTemplate>
      </Router>
    </Provider>
  );
};

export default Root;
