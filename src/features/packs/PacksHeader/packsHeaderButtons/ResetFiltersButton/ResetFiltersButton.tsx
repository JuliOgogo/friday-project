import React from 'react'

import { useSearchParams } from 'react-router-dom'

import resetFiltersIcon from '../../../../../assets/images/filter-remove.svg'

import s from './ResetFiltersButton.module.css'

export const ResetFiltersButton = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleRequestReset = () => {
    setSearchParams({})
  }

  return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} onClick={handleRequestReset} />
    </div>
  )
}
