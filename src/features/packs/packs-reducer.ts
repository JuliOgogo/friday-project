import { AxiosError } from 'axios'

import { SetAppErrorType, SetAppStatusType, SetIsInitializedAppType } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { packsAPI, ParamsTemplateType } from './packs-api'

const initialState = {
  cardPacks: [] as DomainPackType[],
  cardPacksTotalCount: 0,
  // количество колод
  maxCardsCount: 53, // 53 значение, которое приходит с бэка по умолчанию
  minCardsCount: 0,
  page: 1, // выбранная страница
  pageCount: 5,
  sortPacks: '0updated',
}

export type DomainPackType = {
  cardsCount: number
  name: string
  updated: string
  user_name: string
  user_id: string
  _id: string
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsType
): InitialStateType => {
  switch (action.type) {
    case packs_SET_PACKS:
      return {
        ...action.packs,
        cardPacks: action.packs.cardPacks.map(
          ({ _id, name, user_name, updated, cardsCount, user_id }) => ({
            _id,
            name,
            cardsCount,
            updated: new Date(updated).toLocaleDateString(),
            user_name,
            user_id,
          })
        ),
      }
    case packs_CHANGE_PAGE:
      return { ...state, page: action.page }
    case packs_CHANGE_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount }
    default:
      return state
  }
}

// actions
const addPacksAC = (packs: InitialStateType) => ({ type: packs_SET_PACKS, packs } as const)

export const changePageAC = (page: number) => ({ type: packs_CHANGE_PAGE, page } as const)
export const changePageCountAC = (pageCount: number) =>
  ({ type: packs_CHANGE_PAGE_COUNT, pageCount } as const)

// thunks
export const fetchPacksTC =
  (paramsSearch?: ParamsTemplateType): AppThunkType =>
  async dispatch => {
    try {
      const res = await packsAPI.getPacks(paramsSearch)

      dispatch(addPacksAC(res.data))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }
export const createPackTC =
  (name: string, privateCheckbox: boolean): AppThunkType =>
  async dispatch => {
    try {
      await packsAPI.createPack(name, privateCheckbox)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
export const updatePackTC =
  (name: string, pack_id: string): AppThunkType =>
  async dispatch => {
    try {
      await packsAPI.updatePack(name, pack_id)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
export const deletePackTC =
  (pack_id: string): AppThunkType =>
  async dispatch => {
    try {
      await packsAPI.deletePack(pack_id)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }

// types
export type InitialStateType = typeof initialState
export type AddPacksType = ReturnType<typeof addPacksAC>
export type ChangePageType = ReturnType<typeof changePageAC>
export type ChangePageCountType = ReturnType<typeof changePageCountAC>
export type PacksActionsType =
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | AddPacksType
  | ChangePageType
  | ChangePageCountType

// const
const packs_SET_PACKS = 'packs/SET_PACKS'
const packs_CHANGE_PAGE = 'packs/CHANGE_PAGE'
const packs_CHANGE_PAGE_COUNT = 'packs/CHANGE_PAGE_COUNT'
