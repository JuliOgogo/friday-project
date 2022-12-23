import axios from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',

  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/cards/card' : 'https://neko-back.herokuapp.com/2.0/cards/card',
  withCredentials: true,
})

export const cardsAPI = {
  getCards(params: GetCardsParamsType) {
    return instance.get<CardsResponseType>('/cards/card', { params })
  },
  createCard(data: CreateCardType) {
    return instance.post('/cards/card', { card: data })
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`)
  },
  updateCard(payload: UpdateCardValuesType) {
    return instance.put('/cards/card', { card: payload })
  },
}

// types

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: number
  page?: number
  pageCount?: number
}

export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  sortCards: string
}

export type CardType = {
  user_id: string
  cardsPack_id: string
  _id: string
  question: string
  answer: string
  grade: number
  shots: number
  created: Date
  updated: Date
}

export type CreateCardType = {
  cardsPack_id: string
  question: string
  answer: string
  grade?: number
  shots?: number
  questionImg?: string
  questionVideo?: string
  answerImg?: string
  answerVideo?: string
}

export type UpdateCardValuesType = {
  _id: string
  question?: string
}
