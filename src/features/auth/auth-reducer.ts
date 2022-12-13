import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import {
  SetAppErrorType,
  setAppIsInitializedAC,
  setAppStatusAC,
  SetAppStatusType,
  SetIsInitializedAppType,
} from '../../app/app-reducer'
import { RootThunkType, AppThunkDispatch } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, AuthResponseType, LoginDataType } from './auth-api'

const initialState = {
  error: '',
  isRegistration: false,
  LoginParams: {} as AuthResponseType,
}

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  isRegistration: boolean
  LoginParams: AuthResponseType
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'auth/AUTH_ME':
      return { ...state, ...action.payload }
    case 'auth/REGISTRATION':
      return { ...state, isRegistration: action.isRegistration }
    case 'auth/LOGIN':
      return { ...state, LoginParams: action.payload }
    case 'auth/LOGOUT':
      return { ...state, LoginParams: {} as AuthResponseType }
    case 'auth/SET-ERROR':
      return { ...state, error: action.error }

    default:
      return state
  }
}

///----------- actions creators -----------\\\
export const authMeAC = (payload: AuthResponseType) => {
  return {
    type: 'auth/AUTH_ME',
    payload,
  } as const
}
export const registration = (isRegistration: boolean) =>
  ({ type: 'auth/REGISTRATION', isRegistration } as const)
export const setLoginDataAC = (payload: AuthResponseType) =>
  ({ type: 'auth/LOGIN', payload } as const)
export const setLogoutDataAC = () => ({ type: 'auth/LOGOUT' } as const)
export const setAuthError = (error: string | null) => ({ type: 'auth/SET-ERROR', error } as const)

///----------- thunks creators -----------\\\
/*export const authMeTC = (): RootThunkType => async (dispatch: Dispatch<ActionsType>) => {
  setAppStatusAC('loading')
  try {
    const responce = await authAPI.me()

    dispatch(authMeAC(responce.data))
  } catch (e) {
    return
  } finally {
    setAppStatusAC('idle')
    dispatch(setAppIsInitializedAC(true))
  }
}*/

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const responce = await authAPI.login(data)

    if (responce.data) dispatch(setLoginDataAC(responce.data))
  } catch (e: any) {
    errorUtils(e, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}
export const setLoginTC = (data: LoginDataType) => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.login(data)

    dispatch(setLoginDataAC(res.data))
  } catch (e) {
    const err = e as Error | AxiosError

    if (axios.isAxiosError(err)) {
      const error = err.response?.data
        ? (err.response.data as { error: string }).error
        : err.message

      dispatch(setAuthError(error))
    } else {
      dispatch(setAuthError(`Native error ${err.message}`))
    }
  }
}
export const registrationTC = (email: string, password: string) => {
  return async (dispatch: AppThunkDispatch) => {
    try {
      await authAPI.registration(email, password)
      dispatch(registration(true))
    } catch (e) {
      //errorUtils(e, dispatch)
      const err = e as Error | AxiosError

      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? (err.response.data as { error: string }).error
          : err.message

        dispatch(setAuthError(error))
      } else {
        dispatch(setAuthError(`Native error ${err.message}`))
      }
    }
  }
}
///----------- types -----------\\\
// type InitialStateType = typeof initialState
export type SetAuthErrorType = ReturnType<typeof setAuthError>
export type RegistrationType = ReturnType<typeof registration>
type ActionsType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof setLoginDataAC>
  | ReturnType<typeof setLogoutDataAC>
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | SetAuthErrorType
  | RegistrationType
