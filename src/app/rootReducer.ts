import { combineReducers } from '@reduxjs/toolkit'
import articleReducer from 'slices/articleSlice';
import tagReducer from 'slices/tagSlice';
import feedReducer from 'slices/feedSlice';
import authReducer from 'slices/authSlice';

const rootReducer = combineReducers({
  articles:articleReducer,
  tags:tagReducer,
  feeds: feedReducer,
  auth: authReducer,
});


export default rootReducer;
