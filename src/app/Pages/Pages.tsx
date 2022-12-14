import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import {
  forgotPassword,
  login,
  newPassword,
  page404,
  profile,
  registration,
  startPage,
  wrongPath,
} from '../../common/routes/pathRoutesList'
import { Login } from '../../features/auth/login/Login'
import { ForgotPassword } from '../../features/auth/password/ForgotPassword'
import { NewPassword } from '../../features/auth/password/NewPassword'
import { Registration } from '../../features/auth/registration/Registration'
import { Profile } from '../../features/profile/Profile'

function Pages() {
  return (
    <Routes>
      <Route path={startPage} element={<Navigate to={login} />} />
      <Route path={registration} element={<Registration />} />
      <Route path={login} element={<Login />} />
      <Route path={profile} element={<Profile />} />
      <Route path={forgotPassword} element={<ForgotPassword />} />
      <Route path={newPassword} element={<NewPassword />} />
      <Route
        path={page404}
        element={<h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1>}
      />
      <Route path={wrongPath} element={<Navigate to={page404} />} />
    </Routes>
  )
}

export default Pages
