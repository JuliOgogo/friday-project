import { AxiosError } from 'axios'

import { SetAppErrorType, SetAppStatusType, SetIsInitializedAppType } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authPacks } from './packs-api'

const initialState = {
  cardPacks: [] as Pack[],
  cardPacksTotalCount: 0,
  // количество колод
  maxCardsCount: 60,
  minCardsCount: 0,
  page: 0, // выбранная страница
  pageCount: 5,
}

export type Pack = {
  cardsCount: number
  name: string
  updated: string
  user_name: string
  _id: string
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: CardPacksActionsType
): InitialStateType => {
  switch (action.type) {
    case 'packs/ADD_CARDS':
      return {
        ...state,
        cardPacks: action.cardPacks.map(({ _id, name, user_name, updated, cardsCount }) => ({
          _id,
          name,
          cardsCount,
          updated: new Date(updated).toLocaleDateString(),
          user_name,
        })),
      }
    case 'packs/ADD_CARD':
      return {
        ...action.cardPack,
        cardPacks: action.cardPack.cardPacks.map(
          ({ _id, name, user_name, updated, cardsCount }) => ({
            _id,
            name,
            cardsCount,
            updated: new Date(updated).toLocaleDateString(),
            user_name,
          })
        ),
      }
    case 'packs/CHANGE_PAGE':
      return { ...state, page: action.page }
    default:
      return state
  }
}
const addCardPacks = (cardPacks: Array<Pack>) => ({ type: packs_ADD_CARDS, cardPacks } as const)
const addCardPack = (cardPack: InitialStateType) => ({ type: packs_ADD_CARD, cardPack } as const)

export const changePage = (page: number) => ({ type: packs_CHANGE_PAGE, page } as const)
export const fetchPacksTC = (): AppThunkType => async (dispatch, getState) => {
  try {
    const state = getState().packs
    const params = {
      params: {
        page: state.page ,
        pageCount: state.pageCount,
        max: state.maxCardsCount,
      },
    }

    console.log(params)

    const res = await authPacks.getPacks(params)

    console.log(res.data.cardPacks)
    dispatch(addCardPack(res.data))

  } catch (e) {
    const err = e as Error | AxiosError

    errorUtils(err, dispatch)
  }
}

export const addNewPackTC = (): AppThunkType => async dispatch => {
  try {
    const res = await authPacks.addNewPack({
      cardsPack: {
        name: 'no Name2',
        deckCover: 'url or base64',
        private: false,
      },
    })

    console.log(res.data)
  } catch (e) {
    const err = e as Error | AxiosError

    errorUtils(err, dispatch)
  }
}

export type AddCardPacksType = ReturnType<typeof addCardPacks>
export type AddCardPackType = ReturnType<typeof addCardPack>
export type ChangePageType = ReturnType<typeof changePage>

export type InitialStateType = typeof initialState
export type CardPacksActionsType =
  | SetAppStatusType
  | SetAppErrorType
  | SetIsInitializedAppType
  | AddCardPacksType
  | AddCardPackType
  | ChangePageType

const packs_ADD_CARDS = 'packs/ADD_CARDS'
const packs_ADD_CARD = 'packs/ADD_CARD'
const packs_CHANGE_PAGE = 'packs/CHANGE_PAGE'
