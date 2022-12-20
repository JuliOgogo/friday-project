import React from 'react'

import resetFiltersIcon from '../../../../../assets/images/filter-remove.svg'

import s from './ResetFiltersButton.module.css'

export const ResetFiltersButton = () => {
  return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} />
    </div>
  )
}
