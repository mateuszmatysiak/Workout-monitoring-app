import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Signs from './Signs';
import Calendar from './Calendar';
import PlanManagment from './PlanManagment';
import AddExercise from './AddExercise';
import TrainingPlans from './TrainingPlans';

const Root = () => {
  return (
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
  );
};

export default Root;
