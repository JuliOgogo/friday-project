import React from 'react'

import './App.css'
import { AppBar, Container } from '@material-ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Profile } from '../features/profile/Profile'

import itIncubatorLogo from './itIncubatorLogo.svg'

function App() {
  return (
    <div className="App">
      <AppBar position="static" color={'inherit'}>
        <div style={{ padding: '10px 100px' }}>
          <img src={itIncubatorLogo} />
        </div>
        {/*<div> здесь должна быть либо кнопка 'Sign In', либо значок профиля в зависимости от состояния нашего приложения </div>*/}
      </AppBar>

      <Container fixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<Navigate to={'/profile'} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/404"
            element={<h1 style={{ textAlign: 'center' }}>404: PAGE NOT FOUND</h1>}
          />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
