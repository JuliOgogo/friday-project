import React from 'react'

import './App.css'
import { AppBar, Container } from '@material-ui/core'

import itIncubatorLogo from '../assets/images/itIncubatorLogo.svg'
import { Preloader } from '../common/components/preloader/Preloader'

import Pages from './Pages/Pages'
import { useAppSelector } from './store'

function App() {
  // const dispatch = useAppDispatch()

  /*useEffect(() => {
                dispatch(authMeTC())
            }, [dispatch])*/

  let isInitialized = useAppSelector(state => state.app.isInitialized)

  // ИСПРАВИТЬ ! КОГДА РАЗБЕРЕМСЯ С ЛОГИКОЙ
  if (isInitialized) {
    return <Preloader />
  }

  return (
    <div className="App">
      <AppBar position="static" color={'inherit'}>
        <div style={{ padding: '10px 100px' }}>
          <img alt={'logo'} src={itIncubatorLogo} />
        </div>
        {/*<div> здесь должна быть либо кнопка 'Sign In', либо значок профиля в зависимости от состояния нашего приложения </div>*/}
      </AppBar>

      <Container fixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Pages />
      </Container>
    </div>
  )
}

export default App
