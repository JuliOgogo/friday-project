import React from 'react'

import { Paper, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/store'
import { profile } from '../../../common/routes/pathRoutesList'

import style from './Login.module.css'
import { LoginForm } from './loginForm/LoginForm'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.LoginParams._id)

  if (isLoggedIn) return <Navigate to={profile} />

  return (
    <Paper elevation={3} className={style.loginContainer}>
      <Typography variant="h4" className={style.title}>
        Sing In
      </Typography>
      <LoginForm />
    </Paper>
  )
}
