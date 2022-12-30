import React from 'react'

import { useSearchParams } from 'react-router-dom'

import resetFiltersIcon from '../../../../../assets/images/filter-remove.svg'

import s from './ResetFiltersButton.module.css'
type ResetFiltersButtonType = {
  isFilterStatus: (isFilter: boolean) => void
}

export const ResetFiltersButton = (props: ResetFiltersButtonType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleRequestReset = () => {
    setSearchParams({ page: '1' })
    props.isFilterStatus(true)
  }

  return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} onClick={handleRequestReset} />
    </div>
  )
}
