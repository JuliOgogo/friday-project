import axios, { AxiosError } from 'axios'

import {
  SetAppErrorType,
  setAppStatusAC,
  SetAppStatusType,
  SetIsInitializedAppType,
} from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, AuthResponseType, LoginDataType } from './auth-api'

const initialState: InitialStateType = {
  error: '',
  isRegistration: false,
  LoginParams: {} as AuthResponseType,
  email: '',
  check: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case auth_AUTH_ME:
      return { ...state, ...action.payload }
    case auth_REGISTRATION:
      return { ...state, isRegistration: action.isRegistration }
    case auth_LOGIN:
      return { ...state, LoginParams: action.payload }
    case auth_LOGOUT:
      return { ...state, LoginParams: {} as AuthResponseType }
    case auth_SET_ERROR:
      return { ...state, error: action.error }
    case auth_FORGOT_PASSWORD:
      return {
        ...state,
        email: action.email,
      }
    case auth_CHECK_EMAIL:
      return {
        ...state,
        check: action.check,
      }
    default:
      return state
  }
}

///----------- actions creators -----------\\\
export const authMeAC = (payload: AuthResponseType) => {
  return {
    type: auth_AUTH_ME,
    payload,
  } as const
}
export const registration = (isRegistration: boolean) =>
  ({ type: auth_REGISTRATION, isRegistration } as const)
export const setLoginDataAC = (payload: AuthResponseType) =>
  ({ type: auth_LOGIN, payload } as const)
export const setLogoutDataAC = () => ({ type: auth_LOGOUT } as const)
export const setAuthError = (error: string | null) => ({ type: auth_SET_ERROR, error } as const)
const forgotPasswordAC = (email: string) => ({ type: auth_FORGOT_PASSWORD, email } as const)
const checkEmailAC = (check: boolean) => ({ type: auth_CHECK_EMAIL, check } as const)

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
export const loginTC =
  (data: LoginDataType): AppThunkType =>
  async dispatch => {
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
export const setLoginTC =
  (data: LoginDataType): AppThunkType =>
  async dispatch => {
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
export const setLogoutTC = (): AppThunkType => async dispatch => {
  try {
    let res = await authAPI.logout()

    if (res.data.info === 'logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—') {
      dispatch(setLogoutDataAC())
    }
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
export const registrationTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
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

export const forgotTC =
  (email: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.forgot(email)

      dispatch(forgotPasswordAC(email))
      dispatch(checkEmailAC(true))
      console.log(res.data.info)
    } catch (e) {
      const err = e as Error | AxiosError
      // if (axios.isAxiosError(err)) {
      //     const error = err.response?.data
      //         ? (err.response.data as { error: string }).error
      //         : err.message
      //
      //     dispatch(setAuthError(error))
      // } else {
      //     dispatch(setAuthError(`Native error ${err.message}`))}
    }
  }
export const newPasswordTC =
  (password: string, resetToken: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.newPassword({ password, resetPasswordToken: resetToken })

      dispatch(checkEmailAC(false))
      console.log(res.data.info)
    } catch (e) {
      const err = e as Error | AxiosError
      // if (axios.isAxiosError(err)) {
      //     const error = err.response?.data
      //         ? (err.response.data as { error: string }).error
      //         : err.message
      //
      //     dispatch(setAuthError(error))
      // } else {
      //     dispatch(setAuthError(`Native error ${err.message}`))}
    }
  }

///----------- types -----------\\\
// type InitialStateType = typeof initialState
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  isRegistration: boolean
  LoginParams: AuthResponseType
  email: string
  check: boolean
}
export type SetAuthErrorType = ReturnType<typeof setAuthError>
export type RegistrationType = ReturnType<typeof registration>
export type AuthActionsType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof setLoginDataAC>
  | ReturnType<typeof setLogoutDataAC>
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | SetAuthErrorType
  | RegistrationType
  | ReturnType<typeof forgotPasswordAC>
  | ReturnType<typeof checkEmailAC>

// constants
const auth_AUTH_ME = 'auth/AUTH_ME'
const auth_REGISTRATION = 'auth/REGISTRATION'
const auth_LOGIN = 'auth/LOGIN'
const auth_LOGOUT = 'auth/LOGOUT'
const auth_SET_ERROR = 'auth/SET_ERROR'
const auth_FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
const auth_CHECK_EMAIL = 'auth/CHECK_EMAIL'
