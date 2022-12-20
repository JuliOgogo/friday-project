import React, { useState } from 'react'

import Slider from '@mui/material/Slider'

import { useAppSelector } from '../../../../../app/store'
import { maxCardsNumber, minCardsNumber } from '../../../packs-selector'

import s from './CardsNumber.module.css'

export const CardsNumber = () => {
  const minValue = useAppSelector(minCardsNumber)
  const maxValue = useAppSelector(maxCardsNumber)
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <div className={s.cardsNumber}>
      <div className={s.text}>Number of cards</div>
      <div className={s.slider}>
        <div className={s.value}>{value[0]}</div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          sx={{ width: '155px' }}
        />
        <div className={s.value}>{value[1]}</div>
      </div>
    </div>
  )
}
