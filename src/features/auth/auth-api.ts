import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  forgot(email: string) {
    return instance.post<forgotParamsType, AxiosResponse<forgotResponseType>>('/auth/forgot', {
      email, form: 'test-front-admin <ai73a@yandex.by>', message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/login#/password/new-password/$token$'>link</a> </div>`
    })
  },
  newPassword(payload: newPasswordParamsType) {
    return instance.post<newPasswordParamsType, AxiosResponse<forgotResponseType>>('/auth/set-new-password', payload)
  },
}

// types
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