import React from 'react'

import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../common/routes/pathRoutesList'
import { userNameSelector } from '../../../features/auth/auth-selector'
import { useAppSelector } from '../../store'

import s from './ProfileIcon.module.css'

export const ProfileIcon = () => {
  const name = useAppSelector(userNameSelector)

  return (
    <div className={s.profileIcon}>
      <NavLink to={PATH.PROFILE}>{name}</NavLink>
      <Avatar alt="avatar" src="#" sx={{ width: 36, height: 36, margin: '5px' }} />
    </div>
  )
}
