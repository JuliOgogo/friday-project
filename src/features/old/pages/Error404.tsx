import React from 'react'
import s from './Error404.module.css'
import error404 from './404.svg'

const Error404 = () => {
    return (
        <div>
            <img src={error404} alt={'404'} className={s.error404}/>
        </div>
    )
}

export default Error404