import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useSearchParams } from 'react-router-dom'

import s from '../../../features/packs/PacksHeader/packsHeaderButtons/commonStyles.module.css'
import useDebounce from '../../hook/useDebounce'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 1000)

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const packNameSearch = e.currentTarget.value

    setValue(packNameSearch)
  }

  useEffect(() => {
    if (debouncedValue) {
      searchParams.set('packName', debouncedValue)
      setSearchParams(searchParams)
    }
    if (searchParams.get('packName')) {
      const pageNameSearch = String(searchParams.get('packName'))

      setValue(pageNameSearch)
    }
  }, [searchParams, debouncedValue])

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
