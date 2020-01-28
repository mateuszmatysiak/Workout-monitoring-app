import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';
import PlanManagment from './PlanManagment';
import AddExercise from './AddExercise';
import TrainingPlans from './TrainingPlans';

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainTemplate>
          <Switch>
            <>
              <Route exact path="/" render={() => <Redirect to="/calendar" />} />
              <Route path="/login" component={Signs} />
              <Route path="/register" component={Signs} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/plan-managment" component={PlanManagment} />
              <Route path="/exercise-managment" component={AddExercise} />
              <Route path="/training-plans" component={TrainingPlans} />
            </>
          </Switch>
        </MainTemplate>
      </Router>
    </Provider>
  );
};

export default Root;
