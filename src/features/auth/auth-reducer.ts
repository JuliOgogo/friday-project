/* eslint-disable */
import {AxiosError} from 'axios'

import {
    SetAppErrorType,
    setAppIsInitializedAC,
    SetAppStatusType,
    SetIsInitializedAppType,
} from '../../app/app-reducer'
import {AppThunkType} from '../../app/store'
import {updateUserAC} from '../profile/profile-reducer'
import {errorUtils} from '../../common/utils/error-utils'

import {authAPI, AuthResponseType, LoginDataType} from './auth-api'

const initialState: InitialStateType = {

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
            return {...state, isRegistration: action.isRegistration}
        case auth_LOGIN:
            return {...state, LoginParams: action.payload}
        case auth_LOGOUT:
            //todo переделать объект
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
        default:
            return state
    }
}

///----------- actions creators -----------\\\
export const authMeAC = (LoginParams: AuthResponseType) => {
    return {
        type: auth_AUTH_ME,
        LoginParams,
    } as const
}
export const registration = (isRegistration: boolean) =>
    ({type: auth_REGISTRATION, isRegistration} as const)
export const setLoginDataAC = (payload: AuthResponseType) =>
    ({type: auth_LOGIN, payload} as const)
export const setLogoutDataAC = () => ({type: auth_LOGOUT} as const)

const forgotPasswordAC = (email: string) => ({type: auth_FORGOT_PASSWORD, email} as const)
const checkEmailAC = (check: boolean) => ({type: auth_CHECK_EMAIL, check} as const)

///----------- thunks creators -----------\\\
export const authMeTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.me()

        dispatch(authMeAC(res.data))
    } catch (e) {
        const err = e as Error | AxiosError;
        errorUtils(err, dispatch);
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
                dispatch(updateUserAC(res.data.name, '#'))
            } catch (e) {
                const err = e as Error | AxiosError;
                errorUtils(err, dispatch);
            }
        }

export const setLogoutTC = (): AppThunkType => async dispatch => {
    try {
        let res = await authAPI.logout()

        if (res.data.info === 'logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—') {
            dispatch(setLogoutDataAC())
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        errorUtils(err, dispatch);
    }
}
export const registrationTC =
    (email: string, password: string): AppThunkType =>
        async dispatch => {
            try {
                await authAPI.registration(email, password)
                dispatch(registration(true))
            } catch (e) {
                const err = e as Error | AxiosError;
                errorUtils(err, dispatch);
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
                const err = e as Error | AxiosError;
                errorUtils(err, dispatch);
            }
        }
export const newPasswordTC =
    (password: string, resetToken: string): AppThunkType =>
        async dispatch => {
            try {
                const res = await authAPI.newPassword({password, resetPasswordToken: resetToken})

                dispatch(checkEmailAC(false))
                console.log(res.data.info)
            } catch (e) {
                const err = e as Error | AxiosError;
                errorUtils(err, dispatch);
            }
        }

///----------- types -----------\\\
// type InitialStateType = typeof initialState
export type InitialStateType = {
    isRegistration: boolean
    LoginParams: AuthResponseType
    email: string
    check: boolean
}

export type RegistrationType = ReturnType<typeof registration>
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

// constants
const auth_AUTH_ME = 'auth/AUTH_ME'
const auth_REGISTRATION = 'auth/REGISTRATION'
const auth_LOGIN = 'auth/LOGIN'
const auth_LOGOUT = 'auth/LOGOUT'

const auth_FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
const auth_CHECK_EMAIL = 'auth/CHECK_EMAIL'
