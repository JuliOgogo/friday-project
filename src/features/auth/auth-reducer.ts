import {authAPI} from "./auth-api";
import {Dispatch} from "redux";
import axios, { AxiosError } from 'axios';
const initialState = {
    error: null,
    addedUser:{
        _id: '',
        email: '',
        created: '',
    }
}
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    addedUser:addedUserType
}
//type InitialStateType = typeof initialState
type addedUserType={
    _id: string,
    email: string,
    created: string,
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-ERROR':
            return {...state, error: action.error}
        case "login/REGISTRATION":
            return {...state, addedUser: action.addUser}
        default:
            return state
    }
}
export const setAuthError = (error: string | null) => ({type: 'login/SET-ERROR', error} as const)
export const Registration= (addUser:addedUserType)=>({type: 'login/REGISTRATION', addUser} as const)
export type SetAuthErrorActionType = ReturnType<typeof setAuthError>
export type RegistrationType = ReturnType<typeof Registration>

type ActionsType = SetAuthErrorActionType | RegistrationType

export const RegistrationTC=(email: string,password: string)=> async (dispatch: Dispatch)=>{
    try {
       let res = await authAPI.registration(email, password)
       dispatch(Registration((res.data.addedUser)))
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
export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch<SetAuthErrorActionType>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAuthError(error))
    } else {
        dispatch(setAuthError(`Native error ${err.message}`))
    }
}