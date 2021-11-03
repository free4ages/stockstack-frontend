import { combineReducers } from '@reduxjs/toolkit'
import articleReducer from 'features/articlelist/articleSlice';
import tagReducer from 'features/tagwatch/tagSlice';

const rootReducer = combineReducers({
  articles:articleReducer,
  tags:tagReducer,
});


export default rootReducer;
