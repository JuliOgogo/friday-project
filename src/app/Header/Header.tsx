import React from 'react'

import { AppBar } from '@material-ui/core'
import { Button } from '@mui/material'

import itIncubatorLogo from '../../assets/images/itIncubatorLogo.svg'
import { PATH } from '../../common/routes/pathRoutesList'
import { userEmailSelector } from '../../features/auth/auth-selector'
import { useAppSelector } from '../store'

import s from './Header.module.css'
import { ProfileIcon } from './ProfileIcon/ProfileIcon'

export function Header() {
  const isLoggedIn = useAppSelector(userEmailSelector)

  return (
    <AppBar position="static" color={'inherit'} className={s.appBar} style={{ flexDirection: 'row' }}>
      <img alt={'logo'} src={itIncubatorLogo} />
      {isLoggedIn ? (
        <ProfileIcon />
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
