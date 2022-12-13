import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(payload: any) {
    return instance.post('/auth/login', payload)
  },
  me() {
    return instance.get('/auth/me')
  },
  logout() {
    return instance.delete<LogoutResponseType>('/auth/login')
  },
}

export type LogoutResponseType = {
  info: string
  error: string
}
