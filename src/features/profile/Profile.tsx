import React from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Avatar, Button } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { setLogoutTC } from '../auth/auth-reducer'

import { EditableSpan } from './EditableSpan'
import { updateUserTC } from './profile-reducer'
import s from './Profile.module.css'
import { routing } from '../../common/routes/pathRoutesList'

type ProfilePropsType = {}

// comment
export const Profile: React.FC<ProfilePropsType> = ({}) => {
  const nickName = useAppSelector(state => state.profile.name)
  const email = useAppSelector(state => state.auth.LoginParams.email)

  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(setLogoutTC())
  }

  const updateNickNameHandler = (newNickName: string) => {
    dispatch(updateUserTC(newNickName, 'new avatar'))
  }

  if (!email) {
    return <Navigate to={routing.startPage} />
  }

  return (
    <div>
      <div className={s.profile}>
        <div className={s.text}>Personal Information</div>

        <Avatar alt="avatar" src="#" sx={{ width: 96, height: 96 }} />

        <div className={s.editableSpan}>
          <EditableSpan value={nickName} onChange={updateNickNameHandler} />
        </div>

        <div className={s.email}>{email}</div>

        <Button variant="outlined" onClick={logoutHandler}>
          Log out
        </Button>
      </div>
      <div className={s.back}>
        <KeyboardBackspaceIcon />
        <span>Back to Packs List</span>
      </div>
    </div>
  )
}
