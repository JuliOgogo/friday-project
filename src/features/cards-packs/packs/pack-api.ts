import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',

  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packAPI = {
  getPacks(user_id: string) {
    return instance.get<GetPacksResponseType>('/cards/pack', { params: { user_id: user_id } })
  },
  createPack(name: string, privateCheckbox: boolean) {
    return instance.post<CreatePackResponseType>('/cards/pack', {
      cardsPack: { name, private: privateCheckbox },
    })
  },

  updatePack(data: UpdatePackDataType) {
    return instance.put<UpdatePackResponseType>('cards/pack', { cardsPack: data })
  },
  deletePack(packId: string) {
    return instance.delete<DeletePackResponseType>(`/cards/pack?id=${packId}`)
  },
}

///----------- types -----------\\\
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string
}

export type GetPacksResponseType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type CreatePackResponseType = {
  newCardsPack: PackType
}

export type UpdatePackResponseType = {
  updatedCardsPack: PackType
}

export type DeletePackResponseType = {
  deletedCardsPack: Array<PackType>
}

///----------- data types -----------\\\
export type PackParamsType = {
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: any // добавить тип когда будет сортировка
  page?: number | null
  pageCount?: number | null
  user_id?: string
  block?: boolean
}

export type PackDataType = {
  name?: string
  private?: boolean
  deckCover?: string
}

export type UpdatePackDataType = {
  _id: string
} & PackDataType
