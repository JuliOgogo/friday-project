import { instance } from '../../common/instance/instance'

export const cardsAPI = {
  getCards(params: GetCardsParamsType) {
    return instance.get<CardsResponseType>('/cards/card', {
      params: {
        cardsPack_id: params.cardsPack_id,
        page: params.page,
        pageCount: params.pageCount,
        sortCards: params.sortCards,
        min: params.min,
        max: params.max,
      },
    })
  },
  createCard(data: CreateCardType) {
    return instance.post('/cards/card', {
      card: {
        cardsPack_id: data.cardsPack_id,
        question: data.question,
        answer: data.answer,
        grade: data.grade,
      },
    })
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
