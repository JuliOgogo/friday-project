import React, { useEffect } from 'react'

import './App.css'
import { Container } from '@material-ui/core'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErroSnackbar'
import { Preloader } from '../common/components/preloader/Preloader'
import { authMeTC } from '../features/auth/auth-reducer'

import { Header } from './Header/Header'
import Pages from './Pages/Pages'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  let isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return <Preloader />
  }

  return (
    <div className="App">
      <Header />
      <Container fixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Pages />
      </Container>
      <ErrorSnackbar />
    </div>
  )
}

export default App
