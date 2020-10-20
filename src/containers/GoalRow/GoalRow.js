import React, {Component} from 'react';
import { Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import instance from '../../firebase/instance';

import classes from './GoalRow.module.css';

class GoalRow extends Component {

    state = {
        isDeleted: false,
        goal: this.props.goal
    }

    handleDelete = (event) => {
        this.setState({isDeleted: true});
        const authQueryParam = '?auth=' + this.props.token;
            instance.delete(`goals/${this.state.goal.id}.json${authQueryParam}`).then((response) => {
              console.log(response.data);
            });
    }

    render (){
        function convertToSlug(Text) {
            return Text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        }
        return (
        <>
            {!this.state.isDeleted && <div className={classes.goal} >
                <div className={classes.streakPlusMeasure}><span className={classes.streak}>{this.state.goal.done.length - 1}</span>
                    {this.state.goal.done.length === 2 ? ' day' : ' days'}</div>
                <div className={classes.goalTitle}>  {this.state.goal.goal}</div>
                <div className={classes.actionIcons}>
                    <div className={classes.deleteGoal} onClick={this.handleDelete}><DeleteIcon></DeleteIcon></div>
                    <div className={classes.editGoal}>
                        <Link
                            to={{ pathname: `/goal/${convertToSlug(this.state.goal.goal)}`, goal: this.state.goal }}>
                            <EditIcon className={classes.editIcon}></EditIcon></Link>
                    </div>
                </div>
            </div>}
            <Divider />
        </>)
    }

};

export default GoalRow;