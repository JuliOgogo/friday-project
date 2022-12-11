import React from 'react'
import './App.css'
import { Test } from '../features/old/Test'
import {Header} from "./Header";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErroSnackbar";

function App() {
  return (
    <div className="App">
        <ErrorSnackbar/>
        <Header/>
        <Test />
        <div></div>
        <div></div>
    </div>
  )
}

export default App
