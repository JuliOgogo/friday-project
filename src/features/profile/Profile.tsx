import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, Paper } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPacksList } from '../../common/components/BackToPacksList/BackToPacksList'
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
      <BackToPacksList />
    </div>
  )
}
