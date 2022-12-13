import axios, {AxiosError, AxiosResponse} from 'axios'
export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(payload: any) {
    return instance.post<UserType,AxiosResponse<LoginParamsType>>('/auth/login', payload)
  },
  me() {
    return instance.get('/auth/me')
  },
  registration(email:string,password:string){
    return instance.post<AxiosResponse<RegistrationResponseType>>('/auth/register',{email,password})
  }
}

type RegistrationType ={

}
type RegistrationResponseType = {
  addedUser: addedUserType
  error?: Error | AxiosError
}
type addedUserType={
  _id: string,
  email: string,
  created: Date,
}
type UserType={
  email: string
  password: string
  rememberMe: boolean
}
export type LoginParamsType={
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
// количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;

}