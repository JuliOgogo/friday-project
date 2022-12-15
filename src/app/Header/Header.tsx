import React from 'react'

import { AppBar } from '@material-ui/core'
import { Avatar, Button } from '@mui/material'

import itIncubatorLogo from '../../assets/images/itIncubatorLogo.svg'
import { useAppSelector } from '../store'

import s from './Header.module.css'

export function Header() {
  const isLoggedIn = useAppSelector(state => state.auth.LoginParams.email)
  const name = useAppSelector(state => state.auth.LoginParams.name)

  return (
    <AppBar position="static" color={'inherit'} className={s.appBar}>
      <img alt={'logo'} src={itIncubatorLogo} />
      {isLoggedIn ? (
        <div className={s.profileIcon}>
          <span className={s.name}>{name}</span>
          <Avatar alt="avatar" src="#" sx={{ width: 36, height: 36, margin: '5px' }} />
        </div>
      ) : (
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{
            width: '113px',
            borderRadius: '50px',
          }}
        >
          Sign in
        </Button>
      )}
    </AppBar>
  )
}
