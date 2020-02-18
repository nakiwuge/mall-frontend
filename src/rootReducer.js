import { combineReducers } from 'redux';
import  userReducer  from './Actions/UserAction';
import roleReducer from './Actions/rolesAction';
import storeCategoryReducer from './Actions/storeCategory';
import storeReducer from './Actions/store';
import itemCategoryReducer from './Actions/itemCategory';
import itemReducer from './Actions/item';

const rootReducer = combineReducers({
  userReducer,
  roleReducer,
  storeCategoryReducer,
  storeReducer,
  itemCategoryReducer,
  itemReducer
});

export default rootReducer;
