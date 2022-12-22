import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import s from '../../../features/packs/PacksHeader/packsHeaderButtons/commonStyles.module.css'

export const Search = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>Search</div>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 32 }}>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Provide your text"
          inputProps={{ 'aria-label': 'Provide your text' }}
        />
      </Paper>
    </div>
  )
}
