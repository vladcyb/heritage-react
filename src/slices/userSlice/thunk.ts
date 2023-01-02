import { createAsyncThunk } from '@reduxjs/toolkit'

import AuthService, { ILoginRequest } from '@services/AuthService'

import { actions } from './actions'

export const UserThunk = {
  login: createAsyncThunk(
    actions.login.type,
    async (data: ILoginRequest, { dispatch, rejectWithValue }) => {
      try {
        const response = await AuthService.login(data)
        const { data: res } = response
        if (res.ok) {
          dispatch(actions.login(res.login))
          return true
        }
        return rejectWithValue(res.error)
      } catch(e) {
        return rejectWithValue(false)
      }
    },
  ),
}
