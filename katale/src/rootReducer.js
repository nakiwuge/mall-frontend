import { combineReducers } from 'redux';
import  userReducer  from './Actions/UserAction';
import roleReducer from './Actions/rolesAction';

const rootReducer = combineReducers({
  userReducer,
  roleReducer
});

export default rootReducer;
