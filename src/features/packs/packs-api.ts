import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',

    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authPacks = {
    getPacks(date?:Params) {
        return instance.get<Pack>('/cards/pack', date)
    },
    addNewPack(date:any){
        return instance.post('/cards/pack',date)
    }
}


export type Params=Partial<ParamsTemplateType>

export type ParamsTemplateType={
    params:{
        min?:number
        max?:number
        sortPacks?: string
        page: number
        pageCount: number
        user_id?: string
    }
}
export type Pack={
    cardPacks: Packs[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}
export type cardPack= Pick<Packs, 'name'| 'updated' | 'user_name' | 'cardsCount'>


export type Packs={
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
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

