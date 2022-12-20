import React from 'react'

import Button from '@mui/material/Button'

import { PATH } from '../../../common/routes/pathRoutesList'

import s from './PacksHeader.module.css'
import { CardsNumber } from './packsHeaderButtons/CardsNumber/CardsNumber'

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
        <CardsNumber />
      </div>
    </div>
  )
}
