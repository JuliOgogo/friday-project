import {authAPI} from "../auth-api";
import {AppThunk} from "../../../app/store";


const initialState = {
    email: '',
    check: true
}

export const passwordReducer = (state: InitialStateType = initialState, action: PasswordActionsType): InitialStateType => {
    switch (action.type) {
        case password_FORGOT_PASSWORD:
            return {
                ...state, email: action.email
            }
        case password_CHECK_EMAIL:
            return {
                ...state, check: action.check
            }
        default:
            return {...state}
    }
}

// constants
const password_FORGOT_PASSWORD = 'password/FORGOT-PASSWORD'
const password_CHECK_EMAIL = 'password/CHECK-EMAIL'

// actions
const forgotPasswordAC = (email: string) => ({type: password_FORGOT_PASSWORD, email} as const)
const checkEmailAC = (check: boolean) => ({type: password_CHECK_EMAIL, check} as const)

//thunks
export const forgotTC = (email: string): AppThunk => async dispatch => {
    const res = await authAPI.forgot(email)
    dispatch(forgotPasswordAC(email))
    dispatch(checkEmailAC(true))
    console.log(res.data.info)
}
export const newPasswordTC = (password: string, resetToken: string): AppThunk => async dispatch => {
    const res = await authAPI.newPassword({password, resetPasswordToken: resetToken})
    console.log(res.data.info)
}

// types
export type InitialStateType = typeof initialState
export type PasswordActionsType =
    ReturnType<typeof forgotPasswordAC>
    | ReturnType<typeof checkEmailAC>
