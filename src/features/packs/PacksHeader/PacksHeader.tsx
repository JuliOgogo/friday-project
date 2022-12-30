import React, { useState } from 'react'

import { AddPackModal } from '../../modals/PacksModal/AddPackModal/AddPackModal'

import s from './PacksHeader.module.css'
import { CardsNumber } from './packsHeaderButtons/CardsNumber/CardsNumber'
import { ResetFiltersButton } from './packsHeaderButtons/ResetFiltersButton/ResetFiltersButton'
import { ShowMyAll } from './packsHeaderButtons/ShowMyAll/ShowMyAll'

import { Search } from 'common/components/Search/Search'

export const PacksHeader = () => {
  const [noFilter, setNoFilter] = useState<boolean>(false)

  const noFilterStatus = (isFilter: boolean) => {
    setNoFilter(isFilter)
  }

  return (
    <div className={s.packsHeader}>
      <div className={s.titleAndButton}>
        <div className={s.title}>Packs list</div>
        <AddPackModal />
      </div>
      <div className={s.settingsWrapper}>
        <Search searchParamName={'packName'} noFilterStatus={noFilter} isFilterStatus={noFilterStatus} />
        <ShowMyAll noFilterStatus={noFilter} />
        <CardsNumber />
        <ResetFiltersButton isFilterStatus={noFilterStatus} />
      </div>
    </div>
  )
}
