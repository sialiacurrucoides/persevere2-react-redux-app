import React, {Component} from 'react';

import classes from './CalendarPage.module.css';
import Layout from '../../hoc/Layout/Layout';
import Header from '../../components/Header/Header';
import Days from '../Days/Days';

class CalendarPage extends Component{
    state = {
        goal: this.props.location.goal || {goal:'Unknown', importance: 'importance', streak: 0, userID: 0, done: [[0]], freezeDates: [[0]]},
        latestStreak: 0
    }

    calculateStreak(){
        //the dates must be sorted
        console.log('done dates', this.state.goal.done);
        let doneDates = [];
        let currD;
        for (let d of this.state.goal.done){
            currD = new Date(...d);
            doneDates.push(currD.getTime());
        }
        doneDates.sort();
        console.log('doneDates', doneDates);
        let current, previous, previousDone;
        let streak = 0;
        //if last done date is not later than yesterday
        const maxIndex = doneDates.length - 1;
        for (let d = maxIndex; d > 0; d--){
            current = doneDates[d];
            previous = current - 24*60*60*1000;
            previousDone = doneDates[d-1];
            console.log('current', current);
            console.log('previous', previous);
            console.log('previousDone', previousDone);
            console.log(previous === previousDone);
            if (previous === previousDone){
                streak++;
            }
        }
        return streak;
    }

    render () {
        this.calculateStreak();
        return (
            <Layout>
                <Header title={this.state.goal.goal} homeVisible="true" importance={this.state.goal.importance} isGoalTitle={true} userID={this.state.goal.userID}></Header>
                <p className={classes.streakLine}><span className={classes.streak}>{this.state.goal.done.length - 1}</span> <small>{this.state.goal.done.length === 2 ? 'day' : 'days'} in sum</small></p>
                <p className={classes.streakLine}><span className={classes.streak}>{this.calculateStreak()}</span> <small>{this.state.goal.done.length === 2 ? 'day' : 'days'} in a row</small></p>
                <Days goal={this.state.goal} updateParent={(newGoal) => {this.setState({goal:newGoal})}} />
            </Layout>
        );
    }

}

export default CalendarPage;