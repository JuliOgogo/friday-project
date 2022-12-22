import { AppRootStateType } from '../../app/store'

export const cardsSelector = (state: AppRootStateType) => state.cards.cards
export const packUserId = (state: AppRootStateType) => state.cards.packUserId
