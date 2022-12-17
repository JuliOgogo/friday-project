import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',

  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardAPI = {
  getCards(params: CardsParamsType) {
    return instance.get<GetCardsResponseType>('cards/card', { params })
  },
  createCard(data: CreateCardDataType) {
    return instance.post<CardResponseType>(`cards/card`, { card: data })
  },
  updateCard(data: UpdateCardDataType) {
    return instance.put<UpdateCardResponseType>(`cards/card`, { card: data })
  },
  deleteCard(cardId: string) {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${cardId}`)
  },
}

///----------- types -----------\\\
export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

export type GetCardsResponseType = {
  cards: Array<CardType>
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
}

export type CardResponseType = {
  newCard: CardType
}

export type UpdateCardResponseType = {
  updatedCard: CardType
}

export type DeleteCardResponseType = {
  deletedCard: CardType
}
///----------- data types -----------\\\
export type CardsParamsType = {
  cardsPack_id: string
  cardQuestion?: string
  cardAnswer?: string
  sortCards?: string
  page?: number
  pageCount?: number
}
export type CardDataType = {
  question?: string
  answer?: string
  answerImg?: string
  questionImg?: string
}
export type CreateCardDataType = { cardsPack_id: string } & CardDataType
export type UpdateCardDataType = { _id: string } & CardDataType
