import React from 'react'

import resetFiltersIcon from '../../../../../assets/images/filter-remove.svg'

import s from './ResetFiltersButton.module.css'
import {useSearchParams} from "react-router-dom";
import {fetchPacksTC} from "../../../packs-reducer";
import {useAppDispatch} from "../../../../../app/store";

export const ResetFiltersButton = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const handleRequestReset =(event: React.MouseEvent<unknown>)=>{
        setSearchParams()
        dispatch(fetchPacksTC())
    }
    return (
    <div className={s.resetFiltersButton}>
      <img alt={'reset all filters'} src={resetFiltersIcon} onClick={handleRequestReset}/>
    </div>
  )
}
