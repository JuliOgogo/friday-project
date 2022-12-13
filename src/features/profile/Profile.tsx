import React, { useState } from 'react'

import { Avatar, Button } from '@mui/material'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = ({}) => {
  const [value, setValue] = useState('Ivan')

  return (
    <div className={s.profile}>
      <div className={s.text}>Personal Information</div>

      <Avatar alt="avatar" src="#" sx={{ width: 96, height: 96 }} />

      <EditableSpan value={value} onChange={setValue} />

      <div className={s.email}>j&johnson@gmail.com</div>

      <Button variant="outlined">Log out</Button>
    </div>
  )
}
