import { SetAppErrorType, setAppStatusAC, SetAppStatusType, SetIsInitializedAppType } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { packsAPI, PacksType, ParamsTemplateType } from './packs-api'

const initialState: PacksType = {} as PacksType
// cardPacks: [] as DomainPackType[],
// cardPacksTotalCount: 0,
// // количество колод
// maxCardsCount: 0, // 53 значение, которое приходит с бэка по умолчанию
// minCardsCount: 0,
// page: 1, // выбранная страница
// pageCount: 0,
// sortPacks: '0updated',
// user_id: '',

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
  switch (action.type) {
    case packs_SET_PACKS:
      return {
        ...action.packs,
        cardPacks: action.packs.cardPacks.map(({ _id, name, user_name, updated, cardsCount, user_id, shots }) => ({
          _id,
          name,
          cardsCount,
          updated,
          user_name,
          user_id,
          shots,
        })),
      }
    case packs_CHANGE_PAGE:
      return { ...state, page: action.page }
    case packs_CHANGE_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount }
    case packs_CHANGE_CARDS_NUMBER_IN_PACK:
      return { ...state, minCardsCount: action.min, maxCardsCount: action.max }
    case packs_CHANGE_SORT_PACKS:
      return { ...state, sortPacks: action.sortPacks }
    default:
      return state
  }
}

// actions
const setPacksAC = (packs: InitialStateType) => ({ type: packs_SET_PACKS, packs } as const)

export const changePageAC = (page: number) => ({ type: packs_CHANGE_PAGE, page } as const)
export const changePageCountAC = (pageCount: number) => ({ type: packs_CHANGE_PAGE_COUNT, pageCount } as const)
export const changeCardsNumberInPackAC = (min: number, max: number) =>
  ({
    type: packs_CHANGE_CARDS_NUMBER_IN_PACK,
    min,
    max,
  } as const)
export const changeSortPacksAC = (sortPacks: string) => ({ type: packs_CHANGE_SORT_PACKS, sortPacks } as const)

// thunks
export const fetchPacksTC =
  (paramsSearch?: Partial<ParamsTemplateType>): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.getPacks(paramsSearch)

      dispatch(setPacksAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
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
export type AddPacksType = ReturnType<typeof setPacksAC>
export type ChangePageType = ReturnType<typeof changePageAC>
export type ChangePageCountType = ReturnType<typeof changePageCountAC>
export type ChangeSortPacksType = ReturnType<typeof changeSortPacksAC>

export type PacksActionsType =
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | AddPacksType
  | ChangePageType
  | ChangePageCountType
  | ReturnType<typeof changeCardsNumberInPackAC>
  | ChangeSortPacksType

// const
const packs_SET_PACKS = 'packs/SET_PACKS'
const packs_CHANGE_PAGE = 'packs/CHANGE_PAGE'
const packs_CHANGE_PAGE_COUNT = 'packs/CHANGE_PAGE_COUNT'
const packs_CHANGE_CARDS_NUMBER_IN_PACK = 'packs/CHANGE_CARDS_NUMBER_IN_PACK'
const packs_CHANGE_SORT_PACKS = 'packs/CHANGE_SORT_PACKS'
