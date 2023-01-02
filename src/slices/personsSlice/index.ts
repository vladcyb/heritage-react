import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Person } from '@models/Person'

import { ClearPersonFilterType, SetPersonFilterType, StateType } from './types'
import { PersonsThunk } from './thunk'


const initialState: StateType = {
  loading: false,
  persons: [],
  filters: {
    surname: [],
    name: [],
    patronymic: [],
  },
}

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    create: (state, { payload }: PayloadAction<Person>) => {
      state.persons.push(payload)
      state.loading = false
    },
    update: (state, { payload }: PayloadAction<Person[]>) => {
      state.persons = payload
      state.loading = false
    },
    setFilter: (state, { payload }: PayloadAction<SetPersonFilterType>) => {
      state.filters[payload.dataIndex] = payload.value
    },
    clearFilter: (state, { payload }: PayloadAction<ClearPersonFilterType>) => {
      state.filters[payload.dataIndex] = []
    },
    clearAllFilters: (state) => {
      state.filters = {
        name: [],
        surname: [],
        patronymic: [],
      }
    },
    deleteOne: (state, { payload }: PayloadAction<string>) => {
      const foundIndex = state.persons.findIndex((p) => p._id === payload)
      state.loading = false
      if (foundIndex !== -1) {
        state.persons.splice(foundIndex, 1)
      }
    },
    edit: (state, { payload }: PayloadAction<Person>) => {
      const foundIndex = state.persons.findIndex((p) => p._id === payload._id)
      state.loading = false
      if (foundIndex !== -1) {
        state.persons[foundIndex] = payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PersonsThunk.update.pending, (state) => {
        state.loading = true
      })
      .addCase(PersonsThunk.update.rejected, (state) => {
        state.loading = false
      })
      .addCase(PersonsThunk.create.pending, (state) => {
        state.loading = true
      })
      .addCase(PersonsThunk.create.rejected, (state) => {
        state.loading = false
      })
      .addCase(PersonsThunk.deleteOne.pending, (state) => {
        state.loading = true
      })
      .addCase(PersonsThunk.deleteOne.rejected, (state) => {
        state.loading = false
      })
      .addCase(PersonsThunk.edit.pending, (state) => {
        state.loading = true
      })
      .addCase(PersonsThunk.edit.rejected, (state) => {
        state.loading = false
      })
  },
})
