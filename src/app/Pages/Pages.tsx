import React from 'react'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { PATH } from '../../common/routes/pathRoutesList'
import { userId } from '../../features/auth/auth-selector'
import { Login } from '../../features/auth/login/Login'
import { ForgotPassword } from '../../features/auth/password/ForgotPassword'
import { NewPassword } from '../../features/auth/password/NewPassword'
import { Registration } from '../../features/auth/registration/Registration'
import { Card } from '../../features/cards/Cards/Card/Card'
import { Cards } from '../../features/cards/Cards/Cards'
import { Learn } from '../../features/learn/Learn'
import { AddNewPack } from '../../features/packs/addNewPack/AddNewPack'
import Packs from '../../features/packs/Packs/Packs'
import { Profile } from '../../features/profile/Profile'
import { useAppSelector } from '../store'

function Pages() {
  const PrivateRoutes = () => {
    let isLoggedIn = useAppSelector(userId)

    return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.PACK} element={<Cards />} />
        <Route path={PATH.CARD} element={<Card />} />
        <Route path={PATH.LEARN} element={<Learn />} />
        {/*<Route path={PATH.CARDS} element={<Cards />} />*/}
      </Route>

      <Route index path={PATH.START_PAGE} element={<Profile />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
      <Route path={PATH.NEW_PASS} element={<NewPassword />} />
      <Route path={PATH.ADD_NEW_PACK} element={<AddNewPack />} />

      <Route path={PATH.PAGE404} element={<h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1>} />
      <Route path={PATH.WRONG_PATH} element={<Navigate to={PATH.PAGE404} />} />
    </Routes>
  )
}

export default Pages
