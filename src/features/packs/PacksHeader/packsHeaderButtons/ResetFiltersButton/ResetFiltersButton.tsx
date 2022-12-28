import React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../../../app/store'
import resetFiltersIcon from '../../../../../assets/images/filter-remove.svg'
import { fetchPacksTC } from '../../../packs-reducer'

import s from './ResetFiltersButton.module.css'

export const ResetFiltersButton = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleRequestReset = (event: React.MouseEvent<unknown>) => {
    setSearchParams(searchParams)
  }

  return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} onClick={handleRequestReset} />
    </div>
  )
}
