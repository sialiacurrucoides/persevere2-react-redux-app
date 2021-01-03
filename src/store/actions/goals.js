import * as actionTypes from './actionTypes';
import instance from '../../firebase/instance';


// export const saveGoalSuccess = (id, goalData) => {
//     return {
//         type: actionTypes.SAVE_GOAL_SUCCESS,
//         goalId: id,
//         goalData: goalData
//     };
// };

// export const saveGoalFail = (error) => {
//     return {
//         type: actionTypes.SAVE_GOAL_FAIL,
//         error: error
//     };
// };

// export const saveGoalStart = () => {
//     return {
//         type: actionTypes.SAVE_GOAL_START
//     };
// };

// export const saveGoal = (goalData, token) => {
//     return dispatch => {
//         dispatch(saveGoalStart());
//         instance.post('goals.json?auth=' + token, goalData)
//             .then(response => {
//                 dispatch(saveGoalSuccess(response.data.name, goalData));
//             }).catch(error => {
//                 dispatch(saveGoalFail(error));
//             });
//     };
// };


export const fetchGoalsSuccess = (goals) => {
    return {
        type: actionTypes.FETCH_GOALS_SUCCESS,
        goals: goals
    }
};

export const fetchGoalsFail = (error) => {
    return {
        type: actionTypes.FETCH_GOALS_FAIL,
        error: error
    };
};

export const fetchGoalsStart = () => {
    return {
        type: actionTypes.FETCH_GOALS_START
    };
};

export const fetchGoals = (token, userId) => {
    return dispatch => {
        dispatch(fetchGoalsStart());
        const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userId +'"';
        instance.get('goals.json' + queryParams)
            .then(res => {
            let fetchedGoals = [];
            for(let key in res.data){
                fetchedGoals.push({...res.data[key], id: key});
            };
            dispatch(fetchGoalsSuccess(fetchedGoals));
        }).catch( err => {
            dispatch(fetchGoalsFail(err));
        });
    };
};
