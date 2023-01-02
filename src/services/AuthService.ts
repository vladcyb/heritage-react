import { AxiosResponse } from 'axios'

import instance from './axios'

export interface ILoginRequest {
  login: string
  password: string
}

export type ILoginResponse = {
  ok: true
  login: string
} | {
  ok: false
  error: string
}

class AuthService {
  public login (data: ILoginRequest) {
    return instance.post<ILoginResponse>('/login', data)
  }

  public refresh(): Promise<AxiosResponse> {
    return instance.get('/refresh')
  }
}

export default new AuthService()
