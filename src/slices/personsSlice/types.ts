import { Person } from '@models/Person'
import { SexEnum } from '@enums/SexEnum'


export type PersonFiltersType = {
  surname: string[]
  name: string[]
  patronymic: string[]
}

export type StateType = {
  loading: boolean
  persons: Person[]
  filters: PersonFiltersType
}

export type SetPersonFilterType = {
  dataIndex: keyof Person
  value: string[]
}

export type ClearPersonFilterType = {
  dataIndex: keyof Person
}

export type CreatePersonPayloadType = Partial<Person> & {
  sex: SexEnum
}

export type UpdatePersonPayloadType = Partial<Person> & {
  _id: string
}
