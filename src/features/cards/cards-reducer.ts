import { AxiosError } from 'axios/index'

import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardsAPI, CardType, CreateCardType, UpdateCardValuesType } from './cards-api'

const initialState = {
  cards: [] as CardType[],
}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case cards_SET_CARDS:
      return { ...state, cards: action.cards }
    default:
      return state
  }
}

// actions
export const setCardsAC = (cards: CardType[]) => ({ type: cards_SET_CARDS, cards } as const)

// thunks
const fetchCardsTC =
  (cardsPack_id: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await cardsAPI.getCards({ cardsPack_id })

      dispatch(setCardsAC(res.data.cards))
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
export type CardsActionsType = ReturnType<typeof setCardsAC>

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
