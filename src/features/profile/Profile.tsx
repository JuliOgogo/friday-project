import React from 'react'

import { Avatar } from '@material-ui/core'

import SuperButton from '../../common/components/c2-SuperButton/SuperButton'
import SuperEditableSpan from '../../common/components/c4-SuperEditableSpan/SuperEditableSpan'

import s from './Profile.module.css'

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = ({}) => {
  return (
    <div className={s.profile}>
      <div className={s.text}>Personal Information</div>

      <Avatar alt="avatar" src="#" />

      <SuperEditableSpan value={'Ivan'} />

      <div className={s.email}>j&johnson@gmail.com</div>

      <SuperButton>Log out</SuperButton>
    </div>
  )
}
