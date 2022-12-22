import React from 'react'

import { BackToPacksList } from '../../../common/components/BackToPacksList/BackToPacksList'
import { Search } from '../../../common/components/Search/Search'

import s from './CardsHeader.module.css'
import { HeaderTitle } from './HeaderTitle/HeaderTitle'

export const CardsHeader = () => {
  return (
    <div className={s.cardsHeader}>
      <BackToPacksList />
      <HeaderTitle />
      <div className={s.settingsWrapper}>
        <Search />
      </div>
    </div>
  )
}
