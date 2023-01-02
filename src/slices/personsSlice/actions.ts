import { createAction } from '@reduxjs/toolkit'

import { Person } from '@models/Person'

import { ClearPersonFilterType, SetPersonFilterType, UpdatePersonPayloadType } from './types'

/* eslint-disable no-multi-spaces */
export const actions = {
  update:              createAction<Person[]>                    ('persons/update'),
  create:              createAction<Person>                      ('persons/create'),
  deleteOne:           createAction<string>                      ('persons/deleteOne'),
  edit:                createAction<UpdatePersonPayloadType>     ('persons/edit'),
  setFilter:           createAction<SetPersonFilterType>         ('persons/setFilter'),
  clearFilter:         createAction<ClearPersonFilterType>       ('persons/clearFilter'),
  clearAllFilters:     createAction                              ('persons/clearAllFilters'),
}
/* eslint-enable no-multi-spaces */
