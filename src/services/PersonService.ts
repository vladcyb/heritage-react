import { Person, PopulatedPerson } from '@models/Person'
import { CreatePersonPayloadType, UpdatePersonPayloadType } from '@slices/personsSlice/types'

import instance from './axios'


export interface IPersonTableParams {
  search?: string
}

export type IPersonsResponse = {
  ok: true
  result: Person[]
} | {
  ok: false
  error: string
}

export type ICreatePersonResponse = {
  ok: true
  result: Person
} | {
  ok: false
  error: string
}

export type IGetPersonResponse = {
  ok: true
  result: PopulatedPerson
} | {
  ok: false
  error: string
}


class PersonService {
  public getAll(params?: IPersonTableParams) {
    return instance.post<IPersonsResponse>('/person/get', params)
  }

  public get(id: string) {
    return instance.post<IGetPersonResponse>(`/person/get/${id}`)
  }

  public create(params: CreatePersonPayloadType) {
    return instance.post<ICreatePersonResponse>('/person', params)
  }

  public deleteOne(_id: string) {
    return instance.delete<ICreatePersonResponse>(`/person/${_id}`)
  }

  public edit(person: Partial<UpdatePersonPayloadType> & { _id: string }) {
    return instance.put<ICreatePersonResponse>(`/person/${person._id}`, {
      ...person,
    })
  }
}

export default new PersonService()
