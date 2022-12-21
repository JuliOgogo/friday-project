import { AxiosError } from 'axios'

import {
  SetAppErrorType,
  setAppStatusAC,
  setAppIsInitializedAC,
  SetAppStatusType,
  SetIsInitializedAppType,
} from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, AuthResponseType, LoginDataType } from './auth-api'

const initialState = {
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
      return {
        ...state,
        LoginParams: action.LoginParams,
      }
    case auth_REGISTRATION:
      return { ...state, isRegistration: action.isRegistration }
    case auth_LOGIN:
      return { ...state, LoginParams: action.payload }
    case auth_LOGOUT:
      return initialState
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
    case auth_UPDATE_USER:
      return {
        ...state,
        LoginParams: { ...state.LoginParams, name: action.name, avatar: action.avatar },
      }
    default:
      return state
  }
}

///----------- actions creators -----------\\\
export const authMeAC = (LoginParams: AuthResponseType) =>
  ({ type: auth_AUTH_ME, LoginParams } as const)
export const registrationAC = (isRegistration: boolean) =>
  ({ type: auth_REGISTRATION, isRegistration } as const)
export const setLoginDataAC = (payload: AuthResponseType) =>
  ({ type: auth_LOGIN, payload } as const)
export const setLogoutDataAC = () => ({ type: auth_LOGOUT } as const)

const forgotPasswordAC = (email: string) => ({ type: auth_FORGOT_PASSWORD, email } as const)
const checkEmailAC = (check: boolean) => ({ type: auth_CHECK_EMAIL, check } as const)

export const updateUserAC = (name: string, avatar: string) => {
  return {
    type: auth_UPDATE_USER,
    name,
    avatar,
  } as const
}

///----------- thunks creators -----------\\\
export const authMeTC = (): AppThunkType => async (dispatch, getState) => {
  try {
    const res = await authAPI.me()

    // const state = getState()
    //
    // !state.auth.LoginParams.name &&
    dispatch(authMeAC(res.data))

    // todo if(token! =res.token)
  } catch (e) {
    const err = e as Error | AxiosError

    if (getState().auth.LoginParams.name) errorUtils(err, dispatch)
  } finally {
    dispatch(setAppIsInitializedAC(true))
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

      errorUtils(err, dispatch)
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

    errorUtils(err, dispatch)
  }
}
export const registrationTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    try {
      await authAPI.registration(email, password)
      dispatch(registrationAC(true))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }
export const forgotTC =
  (email: string): AppThunkType =>
  async dispatch => {
    try {
      await authAPI.forgot(email)
      dispatch(forgotPasswordAC(email))
      dispatch(checkEmailAC(true))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }
export const newPasswordTC =
  (password: string, resetToken: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await authAPI.newPassword({
        password,
        resetPasswordToken: resetToken,
      })
      dispatch(setAppStatusAC('succeeded'))
      dispatch(checkEmailAC(false))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }
export const updateUserTC =
  (name: string, avatar: string): AppThunkType =>
  async dispatch => {
    try {
      const data = { name, avatar }
      let res = await authAPI.updateUser(data)

      if (res.data.error === undefined) {
        dispatch(updateUserAC(data.name, data.avatar))
      }
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppIsInitializedAC(true))
    }
  }

///----------- types -----------\\\
export type InitialStateType = typeof initialState
export type RegistrationType = ReturnType<typeof registrationAC>
export type AuthActionsType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof setLoginDataAC>
  | ReturnType<typeof setLogoutDataAC>
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | RegistrationType
  | ReturnType<typeof forgotPasswordAC>
  | ReturnType<typeof checkEmailAC>
  | ReturnType<typeof updateUserAC>

// constants
const auth_AUTH_ME = 'auth/AUTH_ME'
const auth_REGISTRATION = 'auth/REGISTRATION'
const auth_LOGIN = 'auth/LOGIN'
const auth_LOGOUT = 'auth/LOGOUT'
const auth_FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
const auth_CHECK_EMAIL = 'auth/CHECK_EMAIL'
const auth_UPDATE_USER = 'auth/UPDATE_USER'
