import React from 'react'

import { Paper, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/routes/pathRoutesList'
import { userId } from '../auth-selector'

import style from './Login.module.css'
import { LoginForm } from './loginForm/LoginForm'

export const Login = () => {
  const isLoggedIn = useAppSelector(userId)

  if (isLoggedIn) return <Navigate to={PATH.PROFILE} />

  return (
    <Paper elevation={3} className={style.loginContainer}>
      <Typography variant="h4" className={style.title}>
        Sing In
      </Typography>
      <LoginForm />
    </Paper>
  )
}
