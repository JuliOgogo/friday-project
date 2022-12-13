import React, {useEffect} from 'react'
import './App.css'
import {Test} from '../features/old/Test'
import {useAppDispatch, useAppSelector} from "./store";
import {Preloader} from "../common/components/preloader/Preloader";
import {authMeTC} from "../features/auth/auth-reducer";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])
    let isInitialized = useAppSelector(state => state.app.isInitialized)

    if (!isInitialized) {
        return (<Preloader/>)
    }
    return (
        <div className="App">
            <Test/>
            <div></div>
            <div></div>
        </div>
    )
}

export default App
