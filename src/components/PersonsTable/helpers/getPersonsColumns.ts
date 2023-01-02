import { ColumnsType } from 'antd/es/table'

import { Person } from '@models/Person'
import { PersonFiltersType } from '@slices/personsSlice/types'
import { renderDataItem } from '@shared/helpers/renderDataItem'

import { personsSortFactory } from './personsSortFactory'
import { getColumnFilterProps } from './getColumnFilterProps'


export const getPersonsColumns = (filters: PersonFiltersType): ColumnsType<Person> => [
  {
    title: 'Фамилия',
    dataIndex: 'surname',
    width: '25%',
    sorter: (a, b) => personsSortFactory(
      a,
      b,
      'surname',
      'name',
      'patronymic',
      'dateOfBirth',
    ),
    ...getColumnFilterProps('surname'),
    filteredValue: filters.surname,
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    width: '25%',
    sorter: (a, b) => personsSortFactory(
      a,
      b,
      'name',
      'surname',
      'patronymic',
      'dateOfBirth',
    ),
    ...getColumnFilterProps('name'),
    filteredValue: filters.name,
  },
  {
    title: 'Отчество',
    dataIndex: 'patronymic',
    width: '25%',
    sorter: (a, b) => personsSortFactory(
      a,
      b,
      'patronymic',
      'surname',
      'name',
      'dateOfBirth',
    ),
    ...getColumnFilterProps('patronymic'),
    filteredValue: filters.patronymic,
  },
  {
    title: 'Дата рождения',
    dataIndex: 'dateOfBirth',
    width: '25%',
    sorter: (a, b) => personsSortFactory(
      a,
      b,
      'dateOfBirth',
      'surname',
      'name',
      'patronymic',
    ),
    render: renderDataItem,
  },
]
