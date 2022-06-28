import { createAction, createReducer } from '@reduxjs/toolkit'
import { ResponseStatusEnum } from '@enums/ResponseStatusEnum'
import { PopulatedPerson } from '@models/Person'

type StateType = {
  status: ResponseStatusEnum.StatusLoading |
          ResponseStatusEnum.Status404 |
          ResponseStatusEnum.Status500
} | {
  status: ResponseStatusEnum.StatusOk,
  data: PopulatedPerson
}

const actionLoading = createAction('localPersonReducer/loading')
const action404 = createAction('localPersonReducer/404')
const action500 = createAction('localPersonReducer/500')
const actionData = createAction<PopulatedPerson>('localPersonReducer/data')

const initialState = {
  status: ResponseStatusEnum.StatusLoading,
} as StateType

export const PersonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionLoading, (state) => {
      state.status = ResponseStatusEnum.StatusLoading
    })
    .addCase(action404, (state) => {
      state.status = ResponseStatusEnum.Status404
    })
    .addCase(action500, (state) => {
      state.status = ResponseStatusEnum.Status500
    })
    .addCase(actionData, (state, action) => {
      return {
        status: ResponseStatusEnum.StatusOk,
        data: action.payload,
      }
    })
})

export const PersonReducerActions = {
  actionLoading,
  action404,
  action500,
  actionData,
}
