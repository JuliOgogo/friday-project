import { AxiosError } from 'axios'

import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardsAPI, CreateCardType, UpdateCardValuesType } from './cards-api'

const initialState = {
  cards: [] as CardStateType[],
  cardsTotalCount: 0,
  maxGrade: 30,
  minGrade: 5,
  page: 1,
  pageCount: 5,
  packUserId: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
  switch (action.type) {
    case cards_SET_CARDS:
      return {
        ...action.cards,
        cards: action.cards.cards.map(({ updated, question, answer, grade }) => ({
          answer,
          question,
          grade,
          updated: new Date(updated).toLocaleDateString(),
        })),
      }
    default:
      return state
  }
}

// actions
export const setCardsAC = (cards: CardsStateType) => ({ type: cards_SET_CARDS, cards } as const)
//todo изменился тип с CreateCardType на CardStateType
export const addCardAC = (card: CardStateType) =>
  ({
    type: cards_ADD_CARD,
    card,
  } as const)
export const removeCardAC = (packId: string, cardId: string) => ({ type: cards_REMOVE_CARD, cardId } as const)
export const updateCardAC = (values: UpdateCardValuesType) => ({ type: cards_UPDATE_CARD, values } as const)

// thunks
export const fetchCardsTC =
  (cardsPacks_id: string): AppThunkType =>
  async (dispatch, getState) => {
    try {
      const res = await cardsAPI.getCards({ cardsPack_id: cardsPacks_id })

      dispatch(setCardsAC(res.data))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

const addCardTC =
  (data: CreateCardType): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.createCard(data)
      dispatch(fetchCardsTC(data.cardsPack_id))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

const deleteCardTC =
  (cardsPack_id: string, cardId: string): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.deleteCard(cardId)
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

const updateCardTC =
  (cardsPack_id: string, payload: UpdateCardValuesType): AppThunkType =>
  async dispatch => {
    try {
      await cardsAPI.updateCard(payload)
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

// types
export type InitialStateType = typeof initialState
export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof removeCardAC>
  | ReturnType<typeof updateCardAC>

export type CardsStateType = {
  cards: CardStateType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
type CardStateType = {
  question: string
  answer: string
  grade: number

  updated: string
}

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
const cards_ADD_CARD = 'cards/ADD_CARD'
const cards_REMOVE_CARD = 'cards/REMOVE_CARD'
const cards_UPDATE_CARD = 'cards/UPDATE_CARD'
