import React from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import s2 from '../commonStyles.module.css'

import s from './ShowMyAll.module.css'

export const ShowMyAll = () => {
  return (
    <div className={s2.wrapper}>
      <div className={s2.text}>Show packs cards</div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button className={s.button}>My</Button>
        <Button className={s.button}>All</Button>
      </ButtonGroup>
    </div>
  )
}
