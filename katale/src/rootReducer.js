import { combineReducers } from 'redux';
import  userReducer  from './Actions/UserAction';
import roleReducer from './Actions/rolesAction';
import storeCategoryReducer from './Actions/storeCategory';

const rootReducer = combineReducers({
  userReducer,
  roleReducer,
  storeCategoryReducer
});

export default rootReducer;
