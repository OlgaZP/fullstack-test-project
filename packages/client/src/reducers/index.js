import { combineReducers } from 'redux';
import usersSagaReducer from './usersSagaReduser';

const rootReducer = combineReducers({
  sagaUsers: usersSagaReducer
});

export default rootReducer;
