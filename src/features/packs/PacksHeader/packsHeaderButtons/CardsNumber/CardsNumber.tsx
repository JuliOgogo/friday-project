import React, { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { changeCardsNumberInPackAC, fetchPacksTC } from '../../../packs-reducer'
import { maxCardsNumber, minCardsNumber } from '../../../packs-selector'
import s2 from '../commonStyles.module.css'

import s from './CardsNumber.module.css'

export const CardsNumber = () => {
  const dispatch = useAppDispatch()

  const minValue = useAppSelector(minCardsNumber)
  const maxValue = useAppSelector(maxCardsNumber)
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const onChangeCommittedHandler = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    const value = newValue as number[]

    searchParams.set('min', value[0].toString())
    searchParams.set('max', value[1].toString())

    setSearchParams({ ...searchParams })

    dispatch(fetchPacksTC({ min: value[0], max: value[1] }))
  }

  return (
    <div className={s2.wrapper}>
      <div className={s2.text}>Number of cards</div>
      <div className={s.slider}>
        <div className={s.value}>{value[0]}</div>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={onChangeCommittedHandler}
          valueLabelDisplay="auto"
          sx={{ width: '155px' }}
        />
        <div className={s.value}>{value[1]}</div>
      </div>
    </div>
  )
}
