import axios, { AxiosError } from 'axios'

import { AppThunkType } from '../../app/store'
import { AuthResponseType } from '../auth/auth-api'

const initialState: AuthResponseType = {
  avatar: '',
  name: '',
}

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}

///----------- actions creators -----------\\\
export const updateUserAC = (name: string, avatar: string) => {
  return {
    type: profile_UPDATE_USER,
    name,
    avatar,
  } as const
}

///----------- thunks creators -----------\\\
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

///----------- types -----------\\\
type InitialStateType = typeof initialState
export type ProfileActionsType = any

// constants
const profile_UPDATE_USER = 'profile/UPDATE_USER'
