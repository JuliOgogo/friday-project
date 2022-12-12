import axios from 'axios'
import {LoginDataType} from "./login/loginForm/LoginForm";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginDataType) {
        // return instance.post<ResponseType>('auth/login', data)
        return instance.get("ping")
    },
    me() {
        return instance.get<ResponseType>('/auth/me')
    },
}


///----------- types -----------\\\
export type UserType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    avatar: string | null;
}
export type ResponseType = UserType & {
    error?: string;
};
