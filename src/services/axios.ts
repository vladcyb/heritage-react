import * as axios from 'axios'

import Config from '@app/App.config'


const instance = axios.default.create({
  baseURL: Config.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default instance
