import {instance} from "../../common/instance/instance";

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
  cardPacks: DomainPackType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
  sortPacks: string
  user_id: string
}
export type DomainPackType = Pick<PackType, 'name' | 'cardsCount' | 'updated' | 'user_name' | 'user_id' | '_id'>
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
