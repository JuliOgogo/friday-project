import React from 'react'

import { AddPackModal } from '../../modals/PacksModal/AddPackModal/AddPackModal'

import s from './PacksHeader.module.css'
import { CardsNumber } from './packsHeaderButtons/CardsNumber/CardsNumber'
import { ResetFiltersButton } from './packsHeaderButtons/ResetFiltersButton/ResetFiltersButton'
import { ShowMyAll } from './packsHeaderButtons/ShowMyAll/ShowMyAll'

import { Search } from 'common/components/Search/Search'

export const PacksHeader = () => {
  return (
    <div className={s.packsHeader}>
      <div className={s.titleAndButton}>
        <div className={s.title}>Packs list</div>
        <AddPackModal />
      </div>
      <div className={s.settingsWrapper}>
        <Search />
        <ShowMyAll />
        <CardsNumber />
        <ResetFiltersButton />
      </div>
    </div>
  )
}
