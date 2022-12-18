import React from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, Paper } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { PATH } from '../../common/routes/pathRoutesList'
import { setLogoutTC, updateUserTC } from '../auth/auth-reducer'
import { userEmailSelector, userNameSelector } from '../auth/auth-selector'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = ({}) => {
  const nickName = useAppSelector(userNameSelector)
  const email = useAppSelector(userEmailSelector)

  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(setLogoutTC())
  }

  const updateNickNameHandler = (newNickName: string) => {
    dispatch(updateUserTC(newNickName, 'new avatar'))
  }

  if (!email) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <Paper elevation={3} className={s.profile}>
        <div className={s.text}>Personal Information</div>

        <Avatar alt="avatar" src="#" sx={{ width: 96, height: 96, margin: '30px 0 17px 0' }} />

        <div className={s.editableSpan}>
          <EditableSpan value={nickName} onChange={updateNickNameHandler} />
        </div>

        <div className={s.email}>{email}</div>

        <Button
          variant="outlined"
          onClick={logoutHandler}
          sx={{
            width: '127px',
            borderRadius: '50px',
          }}
        >
          <LogoutIcon sx={{ marginRight: '5px', fontSize: '20px' }} />
          Log out
        </Button>
      </Paper>
      <div className={s.back}>
        <KeyboardBackspaceIcon sx={{ marginRight: '5px', fontSize: '20px' }} />
        <NavLink to={PATH.PACKS}>Back to Packs List</NavLink>
      </div>
    </div>
  )
}
