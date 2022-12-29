import { instance } from '../../common/instance/instance'

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
  updateCard(values: UpdateCardValuesType) {
    return instance.put('/cards/card', { card: values })
  },
  gradeCard(data: GradeCardType) {
    return instance.put('/cards/grade', data)
  },
}

// types

export type GetCardsParamsType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
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

export type GradeCardType = {
  grade: number
  card_id: string
}

export type UpdateCardValuesType = Pick<CardType, '_id' | 'question' | 'answer'>
