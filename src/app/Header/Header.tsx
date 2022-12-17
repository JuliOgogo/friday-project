import React from 'react'

import { AppBar } from '@material-ui/core'
import { Avatar, Button } from '@mui/material'

import itIncubatorLogo from '../../assets/images/itIncubatorLogo.svg'
import { PATH } from '../../common/routes/pathRoutesList'
import { userEmailSelector, userNameSelector } from '../../features/auth/auth-selector'
import { useAppSelector } from '../store'

import s from './Header.module.css'

export function Header() {
  const isLoggedIn = useAppSelector(userEmailSelector)
  const name = useAppSelector(userNameSelector)

  return (
    <AppBar
      position="static"
      color={'inherit'}
      className={s.appBar}
      style={{ flexDirection: 'row' }}
    >
      <img alt={'logo'} src={itIncubatorLogo} />
      {isLoggedIn ? (
        <div className={s.profileIcon}>
          <span className={s.name}>{name}</span>
          <Avatar alt="avatar" src="#" sx={{ width: 36, height: 36, margin: '5px' }} />
        </div>
      ) : (
        <Button
          variant="contained"
          href={`#${PATH.LOGIN}`}
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
