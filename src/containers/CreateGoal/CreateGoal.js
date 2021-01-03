import React, {Component} from 'react';
import {connect} from 'react-redux';
import { toast } from "react-toastify";

import classes from './CreateGoal.module.css';
import Layout from '../../hoc/Layout/Layout';
import Header from "../../components/Header/Header";
import Button from '../../components/UI/Button/Button';
import instance from '../../firebase/instance';


class CreateGoal extends Component {

    state = {
        newGoal: {
            goalID: 0,
            goal: this.props.location.goal.name || "",
            streak: 0,
            done: [[0]], //firebase does not create a node having an empty value
            availableStreakFreeze: 3,
            freezedDates: [[0]],
            userID: this.props.userID || 0
        },
        importance: "",
        goalID: Math.floor(Math.random()*1000),
        goalsLength: this.props.goalsLength
    }


    importanceInputHandler = (event) => {
       const reason = event.target.value;
         this.setState({importance: reason});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.importance.trim() === ""){
            toast("Think about why it is important",{
                draggable: true,
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500
            });
        } else {
            const goalData = {
                ...this.state.newGoal,
                importance: this.state.importance,
                goalID: this.props.userID.substring(1,8) + new Date().getTime()
            }
                //this.props.onCreateGoal(goalData, this.props.token);
                instance.post(`goals.json?auth=${this.props.token}`, goalData).then(
                    //success msg
                    res => {
                        toast.success('Goal created!',{
                            draggable: true,
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 2000
                        });
                        setTimeout(() => {this.props.history.push('/goals')},2000);
                    }
    
                ).catch(err => toast.error(err, {
                    draggable: true,
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                }));
        }
        }


    render (){
        return (
        <Layout>
            <form className={classes.createGoal} onSubmit={this.handleSubmit}>
                    <Header title={this.state.newGoal.goal} homeVisible="true"></Header>
                    <textarea className={classes.Reason} type="text"
                        name="importance"
                        placeholder="It is important because..."
                        onChange={this.importanceInputHandler} />
                    <Button btnType="Primary" width="100%" >CREATE</Button>
                </form>
        </Layout>);
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userID: state.auth.userId
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onCreateGoal: (goalData, token) => dispatch(actions.saveGoal(goalData, token))
//     };
// };

export default connect(mapStateToProps)(CreateGoal);
