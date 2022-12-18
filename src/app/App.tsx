import React, { useEffect } from 'react'

import './App.css'
import { Container } from '@material-ui/core'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Preloader } from '../common/components/Preloader/Preloader'
import { authMeTC } from '../features/auth/auth-reducer'

import { isInitializedSelector } from './app-selector'
import { Header } from './Header/Header'
import Pages from './Pages/Pages'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  let isInitialized = useAppSelector(isInitializedSelector)

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
