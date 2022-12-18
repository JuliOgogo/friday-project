import { AppRootStateType } from '../../app/store'

export const packSelector = (state: AppRootStateType) => state.packs.cardPacks

export const packPage = (state: AppRootStateType) => state.packs.page

export const packCount = (state: AppRootStateType) => state.packs.pageCount

//cardPacksTotalCount

export const cardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
