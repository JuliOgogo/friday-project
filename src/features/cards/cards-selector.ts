import { AppRootStateType } from '../../app/store'

export const cardsSelector = (state: AppRootStateType) => state.cards.cards
export const packUserId = (state: AppRootStateType) => state.cards.packUserId

export const cardsTotalCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount
export const cardsPageCountSelector = (state: AppRootStateType) => state.cards.pageCount
export const cardPageSelector = (state: AppRootStateType) => state.cards.page

export const cardSortSelector = (state: AppRootStateType) => state.cards.sortCards
