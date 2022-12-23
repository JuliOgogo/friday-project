import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import { fetchPacksTC } from '../../../features/packs/packs-reducer'
import s from '../../../features/packs/PacksHeader/packsHeaderButtons/commonStyles.module.css'
import useDebounce from '../../hook/useDebounce'

export const Search = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 1000)

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    searchParams.set('packName', value.toString())
    setSearchParams(searchParams)
    //dispatch(setInCommonParamsAC({packName: }))
    // dispatch(fetchPacksTC())
  }, [debouncedValue])

  return (
    <div className={s.wrapper}>
      <div className={s.text}>Search</div>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 32 }}>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          value={value}
          onChange={onChangeHandler}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Provide your text"
          inputProps={{ 'aria-label': 'Provide your text' }}
        />
      </Paper>
    </div>
  )
}
