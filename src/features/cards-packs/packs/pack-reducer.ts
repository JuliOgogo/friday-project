import { AppRootStateType, AppThunkType } from '../../../app/store'
import { errorUtils } from '../../../common/utils/error-utils'

import {
  CreatePackResponseType,
  GetPacksResponseType,
  packAPI,
  PackDataType,
  PackParamsType,
  PackType,
} from './pack-api'

const initialState = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
}

export const packReducer = (
  state: PacksInitialStateType = initialState,
  action: PacksActionType
): any => {
  switch (action.type) {
    case 'PACK/SET_PACKS':
      return { ...state, ...action.payload }
    case 'PACK/CREATE_PACK': {
      return { ...state, cardPacks: [...state.cardPacks, action.payload] }
    }
    default:
      return state
  }
}

///----------- actions creators -----------\\\
export const setPackAC = (payload: GetPacksResponseType) => {
  return {
    type: PACK_SET_PACKS,
    payload,
  } as const
}
export const createPackAC = (payload: PackType) => {
  return {
    type: PACK_CREATE_PACK,
    payload,
  } as const
}
// export const updatePackAC = () => {}
// export const deletePackAC = () => {}

///----------- thunks creators -----------\\\
export const getPackTC =
  (user_id: string): AppThunkType =>
  async dispatch => {
    try {
      let res = await packAPI.getPacks(user_id)

      dispatch(setPackAC(res.data))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const createPackTC =
  (name: string, privateCheckbox: boolean): AppThunkType =>
  async dispatch => {
    try {
      let res = await packAPI.createPack(name, privateCheckbox)

      dispatch(createPackAC(res.data.newCardsPack))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

///----------- types -----------\\\
export type PacksInitialStateType = typeof initialState

export type PacksActionType = ReturnType<typeof setPackAC> | ReturnType<typeof createPackAC>
// | ReturnType<typeof updatePackAC>
// | ReturnType<typeof deletePackAC>

///----------- constants -----------\\\
const PACK_SET_PACKS = 'PACK/SET_PACKS'
const PACK_CREATE_PACK = 'PACK/CREATE_PACK'
