import React, { FC } from 'react'

import s from './Title.module.css'

export const Title: FC<TitleType> = ({ text, titleStyle }) => {
  return (
    <div className={titleStyle ? titleStyle : s.title}>
      <h2>{text}</h2>
    </div>
  )
}

type TitleType = {
  text: string
  titleStyle?: string
}
