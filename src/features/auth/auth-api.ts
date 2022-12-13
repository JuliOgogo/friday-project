import axios, { AxiosError, AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.get<ResponseType>('/auth/me', {})
    //return instance.get("ping")
  },
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<AuthResponseType>>('/auth/login', data)
    // return instance.get("ping") //проверка пингуется или нет
  },
  registration(email: string, password: string) {
    return instance.post<AxiosResponse<RegistrationResponseType>>('/auth/register', {
      email,
      password,
    })
  },
  logout() {
    return instance.delete<LogoutResponseType>('/auth/login')
  },
}

export type LogoutResponseType = {
  info: string
  error: string
}

///----------- types -----------\\\
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
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  avatar: string | null
}
export type ResponseType = AuthResponseType & {
  error?: string
}
