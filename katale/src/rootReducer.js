import { combineReducers } from 'redux';
import  userReducer  from './Actions/UserAction';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
