import React from 'react'

import error404 from '../../../assets/images/404.svg'

import s from './Error404.module.css'

const Error404 = () => {
  return (
    <div>
      <img src={error404} alt={'404'} className={s.error404} />
    </div>
  )
}

export default Error404
