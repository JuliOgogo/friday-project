import { AxiosError } from 'axios'

import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import {
  cardsAPI,
  CardsResponseType,
  CardType,
  CreateCardType,
  GetCardsParamsType,
  UpdateCardValuesType,
} from './cards-api'

const initialState = {
  cards: [] as CardStateType[],
  cardsTotalCount: 0,
  maxGrade: 30,
  minGrade: 5,
  page: 1,
  pageCount: 5,
  packUserId: '',
  sortCards: '0updated',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
  switch (action.type) {
    case cards_SET_CARDS:
      return {
        ...action.cards,
        cards: action.cards.cards.map(({ cardsPack_id, _id, updated, question, answer, grade }) => ({
          cardsPack_id,
          _id,
          answer,
          question,
          grade,
          updated: new Date(updated).toLocaleDateString(),
        })),
      }
    case cards_CHANGE_PAGE_COUNT:
      return { ...state, pageCount: action.pageCount }
    case cards_CHANGE_PAGE:
      return { ...state, page: action.page }
    case cards_CHANGE_SORT:
      return { ...state, sortCards: action.sortCards }
    default:
      return state
  }
}

// actions
export const setCardsAC = (cards: CardsResponseType) => ({ type: cards_SET_CARDS, cards } as const)

export const changeCardsPageCountAC = (pageCount: number) =>
  ({
    type: cards_CHANGE_PAGE_COUNT,
    pageCount,
  } as const)
export const changeCardsPageAC = (page: number) => ({ type: cards_CHANGE_PAGE, page } as const)
export const changeSortCardsAC = (sortCards: string) => ({ type: cards_CHANGE_SORT, sortCards } as const)

// thunks
export const fetchCardsTC =
  (params: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await cardsAPI.getCards({ cardsPack_id: params.cardsPack_id })

      dispatch(setCardsAC(res.data))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

export const addCardTC =
  (data: CreateCardType): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.createCard(data)
      dispatch(fetchCardsTC({ cardsPack_id: data.cardsPack_id }))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

export const deleteCardTC =
  (cardsPack_id: string, cardId: string): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.deleteCard(cardId)
      dispatch(fetchCardsTC({ cardsPack_id: cardsPack_id }))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

export const updateCardTC =
  (cardsPack_id: string, card: UpdateCardValuesType): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.updateCard(card)
      dispatch(fetchCardsTC({ cardsPack_id: cardsPack_id }))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

// types
export type InitialStateType = typeof initialState
export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof changeCardsPageCountAC>
  | ReturnType<typeof changeCardsPageAC>
  | ReturnType<typeof changeSortCardsAC>

export type CardStateType = Pick<CardType, 'cardsPack_id' | '_id' | 'question' | 'answer' | 'grade' | 'updated'>

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
const cards_CHANGE_PAGE_COUNT = 'cards/CHANGE_PAGE_COUNT'
const cards_CHANGE_PAGE = 'cards/CHANGE_PAGE'
const cards_CHANGE_SORT = 'cards/CHANGE_SORT'
