import { AppThunk } from "../../app/store";
import { authAPI } from "./auth-api";
import {AxiosError} from "axios";


const initialState = {
  email: '',
  check: true
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case auth_FORGOT_PASSWORD:
      return {
        ...state, email: action.email
      }
    case auth_CHECK_EMAIL:
      return {
        ...state, check: action.check
      }
    default:
      return {...state}
  }
}

// constants
const auth_FORGOT_PASSWORD = 'auth/FORGOT-PASSWORD'
const auth_CHECK_EMAIL = 'auth/CHECK-EMAIL'

// actions
const forgotPasswordAC = (email: string) => ({type: auth_FORGOT_PASSWORD, email} as const)
const checkEmailAC = (check: boolean) => ({type: auth_CHECK_EMAIL, check} as const)

//thunks
export const forgotTC = (email: string): AppThunk => async dispatch => {
  try {
    const res = await authAPI.forgot(email)
    dispatch(forgotPasswordAC(email))
    dispatch(checkEmailAC(true))
    console.log(res.data.info)
  } catch (e){
    const err = e as Error | AxiosError
  }
}
export const newPasswordTC = (password: string, resetToken: string): AppThunk => async dispatch => {
  try {
    const res = await authAPI.newPassword({ password, resetPasswordToken: resetToken });
    dispatch(checkEmailAC(false));
    console.log(res.data.info);
  } catch (e){
    const err = e as Error | AxiosError
  }
}

// types
export type InitialStateType = typeof initialState
export type AuthActionsType =
  ReturnType<typeof forgotPasswordAC>
  | ReturnType<typeof checkEmailAC>
