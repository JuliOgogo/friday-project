import React from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../routes/pathRoutesList'

import s from './BackToPacksList.module.css'

export const BackToPacksList = () => {
  return (
    <div className={s.back}>
      <KeyboardBackspaceIcon sx={{ marginRight: '5px', fontSize: '20px' }} />
      <NavLink to={PATH.PACKS}>Back to Packs List</NavLink>
    </div>
  )
}
