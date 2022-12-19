import { AppThunkType } from '../../../app/store'
import { errorUtils } from '../../../common/utils/error-utils'

import { GetPacksResponseType, packAPI, PackType } from './pack-api'

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

///----------- thunks creators -----------\\\
export const getPackTC =
  (user_id: string): AppThunkType =>
  async dispatch => {
    try {
      let { data } = await packAPI.getPacks(user_id)

      dispatch(setPackAC(data))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const createPackTC =
  (name: string, privateCheckbox: boolean): AppThunkType =>
  async dispatch => {
    try {
      let { data } = await packAPI.createPack(name, privateCheckbox)

      dispatch(getPackTC(data.newCardsPack.user_id))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const updatePackTC =
  (name: string, _id: string): AppThunkType =>
  async dispatch => {
    try {
      let { data } = await packAPI.updatePack(name, _id)

      dispatch(getPackTC(data.updatedCardsPack.user_id))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

export const deletePackTC =
  (id: string): AppThunkType =>
  async dispatch => {
    try {
      let { data } = await packAPI.deletePack(id)

      dispatch(getPackTC(data.deletedCardsPack.user_id))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

///----------- types -----------\\\
export type PacksInitialStateType = typeof initialState

export type PacksActionType = ReturnType<typeof setPackAC>

///----------- constants -----------\\\
const PACK_SET_PACKS = 'PACK/SET_PACKS'
