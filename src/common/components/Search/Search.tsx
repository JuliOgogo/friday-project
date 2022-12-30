import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useSearchParams } from 'react-router-dom'

import s from '../../../features/packs/PacksHeader/packsHeaderButtons/commonStyles.module.css'
import useDebounce from '../../hook/useDebounce'

type SearchType = {
  searchParamName: string
  noFilterStatus?: boolean
  isFilterStatus: (isFilter: boolean) => void
}
export const Search = (props: SearchType) => {
  let { searchParamName, isFilterStatus, noFilterStatus } = props
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounce<string>(value!, 1000)

  const [searchParams, setSearchParams] = useSearchParams()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const packNameSearch = e.currentTarget.value

    setValue(packNameSearch)

    // if (searchParams.get('page')) {
    //   searchParams.set('page', (1).toString())
    // }
    if (!value) {
      searchParams.delete(searchParamName)
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    if (searchParams.get(searchParamName)) {
      const pageNameSearch = String(searchParams.get(searchParamName))

      setValue(pageNameSearch)
    }
  }, [])

  useEffect(() => {
    if (debouncedValue) {
      searchParams.set(searchParamName, debouncedValue)
      searchParams.set('page', (1).toString())
      setSearchParams(searchParams)
    }

    if (noFilterStatus) {
      setValue('')
      isFilterStatus(false)
      searchParams.delete(searchParamName)
      setSearchParams(searchParams)
    }
    if (debouncedValue === '') {
      searchParams.delete(searchParamName)
      setSearchParams(searchParams)
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
          sx={{ ml: 1, flex: 1, fontFamily: 'Montserrat, sans-serif' }}
          placeholder="Provide your text"
          inputProps={{ 'aria-label': 'Provide your text' }}
        />
      </Paper>
    </div>
  )
}
