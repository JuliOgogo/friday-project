import axios, { AxiosError, AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',

  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.post<ResponseType>('/auth/me', {})
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
    return instance.post<forgotResponseType>('/auth/forgot', {
      email,
      form: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: limegreen; padding: 15px">password recovery link: <a href="http://localhost:3000/#/new-password/$token$">link</> </div>`,
    })
  },
  newPassword(payload: newPasswordParamsType) {
    return instance.post<newPasswordParamsType, AxiosResponse<forgotResponseType>>(
      '/auth/set-new-password',
      payload
    )
  },
}

///----------- types -----------\\\
export type LogoutResponseType = {
  info: string
  error: string
}
type RegistrationResponseType = {
  addedUser: addedUserType
  error?: Error | AxiosError
}
type addedUserType = {
  _id: string
  email: string
  created: Date
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
type forgotResponseType = {
  info: string
  error: string
}
type forgotParamsType = {
  email: string
  from: string
  message: string
}
type newPasswordParamsType = {
  password: string
  resetPasswordToken: string
}
