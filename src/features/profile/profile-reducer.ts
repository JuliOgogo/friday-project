import { AxiosError } from 'axios'

import { setAppIsInitializedAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'
import { AuthResponseType } from '../auth/auth-api'

import { profileAPI } from './profile-api'

const initialState: AuthResponseType = {
  _id: '',
  email: '',
  rememberMe: false,
  isAdmin: false,
  name: '',
  verified: false,
  publicCardPacksCount: null,
  created: '',
  updated: '',
  __v: 0,
  avatar: '',
}

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case profile_UPDATE_USER: {
      return { ...state, name: action.name, avatar: action.avatar }
    }
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
export const updateUserTC =
  (name: string, avatar: string): AppThunkType =>
  async dispatch => {
    try {
      const data = { name, avatar }
      let res = await profileAPI.updateUser(data)

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
type InitialStateType = typeof initialState
export type ProfileActionsType = ReturnType<typeof updateUserAC>

// constants
const profile_UPDATE_USER = 'profile/UPDATE_USER'
