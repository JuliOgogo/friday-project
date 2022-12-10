import React from 'react'
import {HashRouter} from 'react-router-dom'
import Pages from './Pages'

export const Test = () => {
    return (
        <HashRouter>
            {/*в gh-pages лучше работает HashRouter*/}
            <Pages/>
        </HashRouter>
    )
}