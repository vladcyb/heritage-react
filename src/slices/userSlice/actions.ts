import { createAction } from '@reduxjs/toolkit'

export const actions = {
  login: createAction<string>('user/login'),
  logout: createAction('user/logout'),
}
