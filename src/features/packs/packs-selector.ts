import { AppRootStateType } from '../../app/store'

export const packSelector = (state: AppRootStateType) => state.packs.cardPacks

export const packPage = (state: AppRootStateType) => state.packs.page

export const packCount = (state: AppRootStateType) => state.packs.pageCount

//cardPacksTotalCount

export const cardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount

// min/max number of cards in pack

export const minCardsNumber = (state: AppRootStateType) => state.packs.minCardsCount
export const maxCardsNumber = (state: AppRootStateType) => state.packs.maxCardsCount

export const user_id_login =( state: AppRootStateType)=> state.auth.LoginParams._id
