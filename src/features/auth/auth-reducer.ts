import {authAPI, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import axios, { AxiosError } from 'axios';
import {AppThunkDispatch} from "../../app/store";
const initialState = {
    error: null,
    isRegistration: false,
    LoginParams: {}
}
// todo isregistration
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isRegistration: boolean,
    LoginParams: LoginParamsType | {}
}


//type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-ERROR':
            return {...state, error: action.error}
        case "login/REGISTRATION":
            return {...state, isRegistration: action.isRegistration}
        case "login/SET-LOGIN":
            return {...state, LoginParams: action.payload}
        default:
            return state
    }
}
// todo исправить функции с маленькой буквы
export const setAuthError = (error: string | null) => ({type: 'login/SET-ERROR', error} as const)
export const registration= (isRegistration:boolean)=>({type: 'login/REGISTRATION', isRegistration} as const)
export type SetAuthErrorType = ReturnType<typeof setAuthError>
export type RegistrationType = ReturnType<typeof registration>

type ActionsType = SetAuthErrorType | RegistrationType | setLoginType

export const setLogin=(payload:LoginParamsType)=>({type: 'login/SET-LOGIN',payload} as const)
export type setLoginType = ReturnType<typeof setLogin>


export const setLoginTC=(email:string,password: string,rememberMe: boolean) =>  async(dispatch: AppThunkDispatch)=>{
    try {
        let res = await authAPI.login({email,password,rememberMe})
        console.log(res.data)

    }catch (e){
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAuthError(error))
        } else {
            dispatch(setAuthError(`Native error ${err.message}`))
        }
    }
}



export const registrationTC=(email: string,password: string)=> {
    return async (dispatch: AppThunkDispatch) => {
        try {
            await authAPI.registration(email, password)
            dispatch(registration(true))
        } catch (e) {
            //errorUtils(e, dispatch)
            const err = e as Error | AxiosError
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
                dispatch(setAuthError(error))
            } else {
                dispatch(setAuthError(`Native error ${err.message}`))
            }

        }
    };
}
export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch<SetAuthErrorType>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAuthError(error))
    } else {
        dispatch(setAuthError(`Native error ${err.message}`))
    }
}