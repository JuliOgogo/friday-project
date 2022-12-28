import React from 'react'

import Button from '@mui/material/Button'

import { PacksModal } from '../../modals/PacksModal/PacksModal'

import s from './PacksHeader.module.css'
import { CardsNumber } from './packsHeaderButtons/CardsNumber/CardsNumber'
import { ResetFiltersButton } from './packsHeaderButtons/ResetFiltersButton/ResetFiltersButton'
import { ShowMyAll } from './packsHeaderButtons/ShowMyAll/ShowMyAll'

import { Search } from 'common/components/Search/Search'
import useModal from 'common/hook/useModal'

export const PacksHeader = () => {
  const { isShowing, toggle } = useModal()

  return (
    <div className={s.packsHeader}>
      <div className={s.titleAndButton}>
        <div className={s.title}>Packs list</div>
        <Button variant={'contained'} sx={{ borderRadius: '30px' }} onClick={toggle}>
          Add new pack
        </Button>
        <PacksModal titleName={'Add new pack'} open={isShowing} hide={toggle} />
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
