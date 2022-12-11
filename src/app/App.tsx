import React from 'react'
import './App.css'
import { Test } from '../features/old/Test'
import {Header} from "./Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <Test />
        <div></div>
        <div></div>
    </div>
  )
}

export default App
