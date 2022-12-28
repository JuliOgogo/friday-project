import { AxiosError } from 'axios'

import { instance } from '../../common/instance/instance'

export const authAPI = {
  me() {
    return instance.post<ResponseType>('/auth/me')
    //return instance.get("ping")
  },
  registration(email: string, password: string) {
    return instance.post<RegistrationResponseType>('/auth/register', {
      email,
      password,
    })
  },
  login(data: LoginDataType) {
    return instance.post<AuthResponseType>('/auth/login', data)
    // return instance.get("ping") //проверка пингуется или нет
  },
  logout() {
    return instance.delete<LogoutResponseType>('/auth/me')
  },
  forgot(email: string) {
    return instance.post<ForgotResponseType>('/auth/forgot', {
      email,
      form: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: limegreen; padding: 15px">password recovery link: <a href="http://localhost:3000/#/new-password/$token$">link</> </div>`,
    })
  },
  newPassword(payload: NewPasswordParamsType) {
    return instance.post<ForgotResponseType>('/auth/set-new-password', payload)
  },
  updateUser(data: { name: string; avatar: string }) {
    return instance.put<UpdatedUserResponseType>('/auth/me', data)
  },
}

///----------- types -----------\\\
export type LogoutResponseType = {
  info: string
  error: string
}
type UpdatedUserResponseType = {
  updatedUser: AuthResponseType
  error?: string
}
type RegistrationResponseType = {
  addedUser: {}
  error?: Error | AxiosError
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export type AuthResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number | null
  created: string
  updated: string
  __v: number
  avatar: string | null
}
export type ResponseType = AuthResponseType & {
  error?: string
}
type ForgotResponseType = {
  info: string
  error: string
}
type NewPasswordParamsType = {
  password: string
  resetPasswordToken: string
}
