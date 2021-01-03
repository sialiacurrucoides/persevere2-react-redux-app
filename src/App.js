import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import LogOut from './containers/Auth/Logout/Logout';
import Home from './components/HomePage/HomePage';
import Calendar from './containers/CalendarPage/CalendarPage';
import * as actions from './store/actions/index';


const asyncGoal = asyncComponent(() => {
  return import('./containers/CalendarPage/CalendarPage');
});

const asyncGoals = asyncComponent(() => {
  return import('./containers/GoalList/GoalList');
});

const asyncCreate = asyncComponent(() => {
  return import('./containers/CreateGoal/CreateGoal');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  render (){
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  
    if (this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/goals" exact component={asyncGoals} />
          <Route path='/goal/:title' component={asyncGoal} />
          <Route path="/create" component={asyncCreate} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/logout" component={LogOut} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        {routes}
        <ToastContainer/>
      </div>
    );
  }

}

const mapStatetoProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App));
