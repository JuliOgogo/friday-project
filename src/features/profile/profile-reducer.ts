import { Dispatch } from 'redux'

import { authAPI } from '../auth/auth-api'

const initialState: initialStateType = {
  isLoggedIn: false,
}

export const profileReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions
export const isLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
/*export const loginTC = (payload: RequestPayloadType) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(payload)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(isLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
}*/

export const logoutTC = () => (dispatch: ThunkDispatchType) => {
  authAPI
    .logout()
    .then(res => {
      if (res.data.info === 'logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—') {
        dispatch(isLoggedInAC(false))
      } else {
      }
    })
    .catch(e => {})
}

// types
type initialStateType = {
  isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof isLoggedInAC>

export type ThunkDispatchType = Dispatch<ActionsType>
