import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    goals: [],
    goal: {}
};

const fetchGoalsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchGoalsSuccess = ( state, action ) => {
    return updateObject( state, {
        goals: action.goals,
        loading: false
    } );
};

const fetchGoalsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


// const saveGoalStart = ( state, action ) => {
//     return updateObject( state, { loading: true} );
// };

// const saveGoalSuccess = ( state, action ) => {
//     const newGoal = updateObject( action.goalData, { id: action.goalId } );
//     return updateObject( state, {
//         loading: false,
//         purchased: true,
//         goal: state.goal.concat( newGoal )
//     } );
// };

// const saveGoalFail = ( state, action ) => {
//     return updateObject( state, { loading: false } );
// };

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_GOALS_START: return fetchGoalsStart( state, action );
        case actionTypes.FETCH_GOALS_SUCCESS: return fetchGoalsSuccess( state, action );
        case actionTypes.FETCH_GOALS_FAIL: return fetchGoalsFail( state, action );
        // case actionTypes.SAVE_GOAL_START: return saveGoalStart( state, action );
        // case actionTypes.SAVE_GOAL_SUCCESS: return saveGoalSuccess( state, action);
        // case actionTypes.SAVE_GOAL_FAIL: return saveGoalFail( state, action );
        default:
            return state;
    }
};

export default reducer;