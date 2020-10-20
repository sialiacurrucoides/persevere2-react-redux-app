import React, {Component} from 'react';

import classes from './CalendarPage.module.css';
import Layout from '../../hoc/Layout/Layout';
import Header from '../../components/Header/Header';
import Days from '../Days/Days';

class CalendarPage extends Component{
    state = {
        goal: this.props.location.goal || {goal:'Unknown', importance: 'importance', streak: 0, userID: 0, done: [[0]], freezeDates: [[0]]}
    }

    render () {
        return (
            <Layout>
                <Header title={this.state.goal.goal} homeVisible="true" importance={this.state.goal.importance} isGoalTitle={true} userID={this.state.goal.userID}></Header>
                <p className={classes.streakLine}><span className={classes.streak}>{this.state.goal.done.length - 1}</span> </p>
                <p className={classes.streakLine}><small>{this.state.goal.done.length === 2 ? 'day' : 'days'}</small></p>
                <Days goal={this.state.goal} updateParent={(newGoal) => {this.setState({goal:newGoal})}} />
            </Layout>
        );
    }

}

export default CalendarPage;