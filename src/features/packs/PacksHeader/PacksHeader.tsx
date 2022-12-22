import React from 'react'

import Button from '@mui/material/Button'

import { Search } from '../../../common/components/Search/Search'
import { PATH } from '../../../common/routes/pathRoutesList'

import s from './PacksHeader.module.css'
import { CardsNumber } from './packsHeaderButtons/CardsNumber/CardsNumber'
import { ResetFiltersButton } from './packsHeaderButtons/ResetFiltersButton/ResetFiltersButton'
import { ShowMyAll } from './packsHeaderButtons/ShowMyAll/ShowMyAll'

export const PacksHeader = () => {
  return (
    <div className={s.packsHeader}>
      <div className={s.titleAndButton}>
        <div className={s.title}>Packs list</div>
        <Button variant={'contained'} sx={{ borderRadius: '30px' }} href={`#${PATH.ADD_NEW_PACK}`}>
          Add new pack
        </Button>
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
