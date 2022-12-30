import React, { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../../../app/store'
import { maxCardsNumber, minCardsNumber } from '../../../packs-selector'
import s2 from '../commonStyles.module.css'

import s from './CardsNumber.module.css'

export const CardsNumber = () => {
  const minValue = useAppSelector(minCardsNumber)
  const maxValue = useAppSelector(maxCardsNumber)
  const [value, setValue] = useState<number[]>([minValue || 0, maxValue || 1])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const onChangeCommittedHandler = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    const value = newValue as number[]

    searchParams.set('min', value[0].toString())
    searchParams.set('max', value[1].toString())
    searchParams.set('page', (1).toString())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (searchParams.get('min') || searchParams.get('max')) {
      const minSearch = Number(searchParams.get('min'))
      const maxSearch = Number(searchParams.get('max'))

      setValue([minSearch, maxSearch])
    } else {
      setValue([minValue, maxValue])
    }
  }, [searchParams, minValue, maxValue])

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
