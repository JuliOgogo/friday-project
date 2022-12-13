import React, { useState } from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Avatar, Button } from '@mui/material'

import { useAppSelector } from '../../app/store'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = ({}) => {
  const [value, setValue] = useState('Ivan')

  const nickName = useAppSelector(state => state.auth.LoginParams.name)
  const email = useAppSelector(state => state.auth.LoginParams.email)

  return (
    <div>
      <div className={s.back}>
        <KeyboardBackspaceIcon />
        <span>Back to Packs List</span>
      </div>
      <div className={s.profile}>
        <div className={s.text}>Personal Information</div>

        <Avatar alt="avatar" src="#" sx={{ width: 96, height: 96 }} />

        <div className={s.editableSpan}>
          <EditableSpan value={nickName} onChange={setValue} />
        </div>

        <div className={s.email}>{email}</div>

        <Button variant="outlined">Log out</Button>
      </div>
    </div>
  )
}