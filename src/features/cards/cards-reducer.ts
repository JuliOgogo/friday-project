import { AxiosError } from 'axios'

import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardsAPI, CardsResponseType, CardType, CreateCardType, UpdateCardValuesType } from './cards-api'

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
        cards: action.cards.cards.map(({ cardsPack_id, _id, updated, question, answer, grade }) => ({
          cardsPack_id,
          _id,
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
export const setCardsAC = (cards: CardsResponseType) => ({ type: cards_SET_CARDS, cards } as const)

// thunks
export const fetchCardsTC =
  (cardsPacks_id: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await cardsAPI.getCards({ cardsPack_id: cardsPacks_id })

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
      dispatch(fetchCardsTC(data.cardsPack_id))
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
      dispatch(fetchCardsTC(cardsPack_id))
    } catch (e) {
      const err = e as Error | AxiosError

      errorUtils(err, dispatch)
    }
  }

export const updateCardTC =
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
export type CardsActionsType = ReturnType<typeof setCardsAC>

export type CardStateType = Pick<CardType, 'cardsPack_id' | '_id' | 'question' | 'answer' | 'grade' | 'updated'>

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
