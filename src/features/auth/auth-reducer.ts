
import {authAPI} from "./auth-api";
import {Dispatch} from "redux";
import axios, { AxiosError } from 'axios';
import {setAppErrorAC, SetAppErrorActionType} from "../../app/app-reducer";
const initialState = {
    isLoggedIn: false,
    error: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const RegistrationTC=(email: string,password: string)=> async (dispatch: Dispatch)=>{
    try {
       let res = await authAPI.registration(email, password)
        console.log(res.data)
    }catch (e){
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAppErrorAC(error))
        } else {
            dispatch(setAppErrorAC(`Native error ${err.message}`))
        }

    }
}
export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch<SetAppErrorActionType>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}