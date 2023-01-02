import { createAsyncThunk } from '@reduxjs/toolkit'

import PersonService, { IPersonTableParams } from '@services/PersonService'
import { ERRORS } from '@shared/constants'

import { actions } from './actions'
import { CreatePersonPayloadType, UpdatePersonPayloadType } from './types'


export const PersonsThunk = {
  update: createAsyncThunk(
    actions.update.type,
    async (params: IPersonTableParams | undefined, { dispatch }) => {
      const result = await PersonService.getAll(params)
      const { data } = result
      if (data.ok) {
        dispatch(actions.update(data.result))
      }
    },
  ),
  create: createAsyncThunk(
    actions.create.type,
    async (params: CreatePersonPayloadType, { dispatch }) => {
      const { data } = await PersonService.create(params)
      if (data.ok) {
        dispatch(actions.create(data.result))
      }
    },
  ),
  edit: createAsyncThunk(
    actions.edit.type,
    async (person: UpdatePersonPayloadType, { dispatch, rejectWithValue }) => {
      const { data } = await PersonService.edit(person)
      if (data.ok) {
        dispatch(actions.edit(person))
        return
      }
      return rejectWithValue(ERRORS.somethingWentWrong)
    },
  ),
  deleteOne: createAsyncThunk(
    actions.deleteOne.type,
    async (_id: string, { dispatch }) => {
      const { data } = await PersonService.deleteOne(_id)
      if (data.ok) {
        dispatch(actions.deleteOne(_id))
      }
    },
  ),
}
