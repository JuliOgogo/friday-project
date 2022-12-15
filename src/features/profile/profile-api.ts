import axios, { AxiosResponse } from 'axios'

import { AuthResponseType } from '../auth/auth-api'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const profileAPI = {
  updateUser(data: { name: string; avatar: string }) {
    return instance.put<AxiosResponse<UpdatedUserResponseType>>('/auth/me', data)
  },
}

///----------- types -----------\\\
type UpdatedUserResponseType = {
  updatedUser: AuthResponseType
  error?: string
}
