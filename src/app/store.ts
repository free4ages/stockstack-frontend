import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import socketMiddleware from 'utils/socketMiddleWare';

import socketClient from 'app/socketClient';
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: ['socket']
      }
    })
    .concat(socketMiddleware(socketClient)),
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store;
