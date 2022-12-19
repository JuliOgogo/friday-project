import { CardType, CreateCardType, UpdateCardValuesType } from './cards-api'

const initialState: CardsStateType = {}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType
): InitialStateType => {
  switch (action.type) {
    case cards_SET_CARDS:
      return { ...state, cards: action.cards }
    // case cards_ADD_CARD:
    //   return { ...state, cards:  }
    default:
      return state
  }
}

// actions
export const setCardsAC = (cards: CardType[]) => ({ type: cards_SET_CARDS, cards } as const)
export const addCardAC = (card: CreateCardType) =>
  ({
    type: cards_ADD_CARD,
    card,
  } as const)
export const removeCardAC = (packId: string, cardId: string) =>
  ({ type: cards_REMOVE_CARD, cardId } as const)
export const updateCardAC = (values: UpdateCardValuesType) =>
  ({ type: cards_UPDATE_CARD, values } as const)

// thunks

// types
export type InitialStateType = typeof initialState
export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof addCardAC>
  | ReturnType<typeof removeCardAC>
  | ReturnType<typeof updateCardAC>

export type CardsStateType = {
  [key: string]: CardType[]
}

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
const cards_ADD_CARD = 'cards/ADD_CARD'
const cards_REMOVE_CARD = 'cards/REMOVE_CARD'
const cards_UPDATE_CARD = 'cards/UPDATE_CARD'
