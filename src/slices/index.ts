import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userSlice } from './userSlice'
import { personsSlice } from './personsSlice'

export const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    persons: personsSlice.reducer,
  }),
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>;
