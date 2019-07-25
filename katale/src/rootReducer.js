import { combineReducers } from 'redux';
import  userReducer  from './Actions/UserAction';
import roleReducer from './Actions/rolesAction';
import storeCategoryReducer from './Actions/storeCategory';
import storeReducer from './Actions/store';

const rootReducer = combineReducers({
  userReducer,
  roleReducer,
  storeCategoryReducer,
  storeReducer
});

export default rootReducer;
