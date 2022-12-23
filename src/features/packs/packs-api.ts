import axios from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',

  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  getPacks(params?: Partial<ParamsTemplateType>) {
    return instance.get<PacksType>('/cards/pack', { params: params })
  },
  createPack(name: string, privateCheckbox: boolean) {
    return instance.post<CreatePackResponseType>('/cards/pack', {
      cardsPack: { name, private: privateCheckbox },
    })
  },
  updatePack(name: string, _id: string) {
    return instance.put<UpdatePackResponseType>('cards/pack', { cardsPack: { name, _id } })
  },
  deletePack(id: string) {
    return instance.delete<DeletePackResponseType>('/cards/pack', { params: { id } })
  },
}

///----------- types -----------\\\
export type ParamsTemplateType = {
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id: string
}
export type PacksType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
  sortPacks: string
  user_id: string
}
export type PackType = {
  cardsCount: number
  created: Date
  deckCover: null
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: Date
  user_id: string
  user_name: string
  __v: number
  _id: string
}
export type CreatePackResponseType = {
  newCardsPack: PackType
}
export type UpdatePackResponseType = {
  updatedCardsPack: PackType
}
export type DeletePackResponseType = {
  deletedCardsPack: PackType
}

// export type cardPack = Pick<Packs, 'name' | 'updated' | 'user_name' | 'cardsCount'>
