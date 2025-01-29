import { combineReducers } from '@reduxjs/toolkit';
import users from './users/usersReducer';

const rootReducer = combineReducers({
  users,
});

export default rootReducer;
