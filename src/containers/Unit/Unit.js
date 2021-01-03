import React, { Component } from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

import classes from './Unit.module.css';
//import calculateCurrDate from "../../utility/calculateCurrentDate";
import Congrat from '../../components/Congratulation/Congrat';
import instance from '../../firebase/instance';
import * as actions from '../../store/actions/index';

class Unit extends Component {

    state = {
        wasCompleted: this.props.wasDone,
        isActivePopup: false,
        checkedCurrDate: false,
        streak: this.props.goal.streak
    }


    clickHandler = (event) => {
        if (this.props.calendar !== "now"){
            toast("Only the last two weeks can be modified",{
                position: toast.POSITION.TOP_CENTER,
                draggable: true,
                autoClose: 1500
            });
            return;
        }
        if (!this.state.wasCompleted) {

            /* send update to the database */
            let newDoneDates = this.props.goal.done; newDoneDates.push(this.props.fullDate);
            const updateData = () => {
                try {
                    let newStreak = this.state.streak + 1;
                    const authQueryParam = '?auth=' + this.props.token;
                    const url = `goals/${this.props.goal.id}.json${authQueryParam}`;
                    let newData = {
                        ...this.props.goal,
                        done: newDoneDates,
                        streak: newStreak
                    }
                    this.props.updateParentParent(newData);
                    instance.put(url, newData)
                    .then( resp => {
                        this.props.onFetchGoals(this.props.token, this.props.userID)
                        this.setState({checkCurrDate:true});
                        this.setState({isActivePopup: true});
                        this.setState({wasCompleted: true});
                        setTimeout(() => {
                            this.setState({isActivePopup: false});
                        }, 1200);
            
                    });

                } catch (e) {
                    console.log(`😱 Axios request failed: ${e}`);
                }
            }
            updateData();
        }

        if (this.state.wasCompleted) {
            
            const undoUpdate = () => {
                let newDoneDates = this.props.goal.done; 
                newDoneDates.filter(item => item !== this.props.fullDate);
                try {
                    const newStreak = this.state.streak - 1;
                    const authQueryParam = '?auth=' + this.props.token;
                    const url = `goals/${this.props.goal.id}.json${authQueryParam}`;
                    let newData = {
                        ...this.props.goal,
                        done: newDoneDates,
                        streak: newStreak
                    }
                    this.props.updateParentParent(newData);
                    instance.put(url, newData)
                    .then( resp => {
                        this.props.onFetchGoals(this.props.token, this.props.userID)
                        this.setState({checkCurrDate:false});
                        this.setState({wasCompleted:false});           
                    });

                } catch (e) {
                    console.log(`😱 Axios request failed: ${e}`);
                }
            }
            undoUpdate();
        }
    }

    render (){
        return (<>
                <div className={this.state.wasCompleted ? [classes.unit, 'undoTheDay'].join(' ') : [classes.unit, 'currentDay'].join(' ')} onClick={this.clickHandler}>
                    <p><small>{this.props.month}</small></p>
                    <p className={classes.middleValue}><small>{this.props.date1} </small></p>
                    <p><small>{this.props.date2}</small></p>
                    {(this.props.calendar === "now" && this.state.wasCompleted) && <CheckCircleIcon className={classes.completed}></CheckCircleIcon>}
                    {this.props.wasDone && this.props.calendar !== "now" && <CheckCircleIcon className={classes.completed}></CheckCircleIcon>}
                </div>
                {this.state.isActivePopup && <Congrat></Congrat>}

            </>);
    }


}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userID: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchGoals: (token, userId) => dispatch(actions.fetchGoals(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Unit);