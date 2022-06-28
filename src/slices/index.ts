import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { useDispatch } from 'react-redux'
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
