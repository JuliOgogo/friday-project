import React from 'react'
import './App.css'
import {Test} from '../features/old/Test'
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
    return (
      <Provider store={store}>
        <div className="App">
          <Test />
        </div>
      </Provider>
    )
}

export default App
