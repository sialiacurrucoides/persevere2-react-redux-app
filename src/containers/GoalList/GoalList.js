import React, {Component} from 'react';
import Fab from "@material-ui/core/Fab";
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import axios from "axios";
// import { trackPromise } from 'react-promise-tracker';


import classes from './GoalList.module.css';
import Layout from '../../hoc/Layout/Layout';
import Tips from '../../components/Tips/Tips';
import Header from '../../components/Header/Header';
import LoadingIndicator from "../../components/UI/Spinner/LoadingIndicator";
import Title from '../../components/Title/Title';
import GoalRow from '../GoalRow/GoalRow';
import * as actions from '../../store/actions/index';

class GoalList extends Component {
    state = {
        newGoal: "",
        anchorEl: null,
        today: new Date()
    }
    componentDidMount(){
        console.log('goalListProps', this.props);
        this.props.onFetchGoals(this.props.token, this.props.userID);
    }

    handleInput = (event) => {
        this.setState({newGoal: event.target.value});
    }

    handleAddReq = (event) => {
        if (this.state.newGoal === "") {
            this.setState({newGoal: event.currentTarget});
            //alert("Please name a goal before clicking the add button.");
            event.preventDefault();
        }
    }

    getGoalsData() {
/*         trackPromise(
            axios.get("/goalsData/" + currUser.data.dateid).then(response => {
                this.setState({goals:response.data});
                console.log("data arrived");
            })); */
    }
    
    render (){
        return (
            <Layout>
                <Tips></Tips>
                <Header title="Add a new goal" homVisible="false" isGoalTitle={false}></Header>
                <div className="classes.CreateNew" id="createNew">
                    <input type="text" onChange={this.handleInput} placeholder="My goal (short title)" value={this.state.newGoal} />
                    <Link to={{ pathname: '/create', goal: { name: this.state.newGoal, user: this.props.userID } }} className={classes.AddLink} onClick={this.handleAddReq}><Fab className={classes.AddBtn} aria-label="add">
                        <AddIcon className={classes.AddIcon}></AddIcon>
                    </Fab></Link>
                    <Popover
                        id={this.open ? 'give-a-goal' : null}
                        open={this.anchorEl ? true : false}
                        anchorEl={this.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <p className={classes.PopOver}>Please name a goal before clicking the add button.</p>
                    </Popover>
                </div>
                <Title name="Current goals"></Title>
                <LoadingIndicator />
                {this.props.goals.map(item => <GoalRow key={item.id} goal={item} today={this.today} token={this.props.token}></GoalRow>)}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userID: state.auth.userId,
        goals: state.goals.goals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchGoals: (token, userId) => dispatch(actions.fetchGoals(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(GoalList);