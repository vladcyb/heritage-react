import { RootState } from '@app/slices'

export const getPersons = (state: RootState) => state.persons
export const getAllPersons = (state: RootState) => state.persons.persons
export const getPersonsFilters = (state: RootState) => state.persons.filters
export const getPersonsLoading = (state: RootState) => state.persons.loading
