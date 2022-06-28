import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateType } from './types'
import { UserThunk } from './thunk'

const initialState: StateType = {
  loading: false,
  login: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      state.login = payload
    },
    logout: (state) => {
      state.login = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserThunk.login.pending, (state) => {
        state.loading = true
      })
      .addCase(UserThunk.login.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(UserThunk.login.rejected, (state) => {
        state.loading = false
      })
  },
})
