import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'

import rootReducer from './rootReducer'

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store;
