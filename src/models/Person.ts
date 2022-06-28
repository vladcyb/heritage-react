import { SexEnum } from '@enums/SexEnum'

export type PersonParentType = {
  _id: string
  nearest?: {
    father?: string
    mother?: string
  },
  surname: string
  name: string
  patronymic: string
  sex: SexEnum
  dateOfBirth: string
}

export type Person = {
  _id: string
  surname: string
  name: string
  patronymic: string
  dateOfBirth: string
  sex: SexEnum
  nearest?: {
    mother?: string
    father?: string
  }
}

export type PopulatedPerson = {
  _id: string
  surname: string
  name: string
  patronymic: string
  dateOfBirth: string
  sex: SexEnum
  nearest?: {
    mother?: PersonParentType
    father?: PersonParentType
  }
}
