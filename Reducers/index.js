import screenReducers from './screenReducers';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    currentScreen: screenReducers.currentScreen
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        state = undefined;
    }

    return allReducers(state, action);
};

export default rootReducer;