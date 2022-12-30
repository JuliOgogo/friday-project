import React, { useState } from 'react'

import { Button, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

import { BackToPacksList } from '../../common/components/BackToPacksList/BackToPacksList'
import { cardsSelector } from '../cards/cards-selector'

import s from './Learn.module.css'
import { RateYourself } from './RateYourself'

import { useAppSelector } from 'app/store'

type LearnPropsType = {}

export const Learn: React.FC<LearnPropsType> = ({}) => {
  const { id_pack } = useParams()
  const cards = useAppSelector(cardsSelector)
  const pack = useAppSelector(state => state.packs.cardPacks.find(pack => pack._id === id_pack))
  const packName = pack && pack.name
  const counter = pack && pack.shots

  console.log(cards)

  const [isAnswered, setIsAnswered] = useState<boolean>(false)

  return (
    <div>
      <div className={s.title}> Learn {packName}</div>
      <Paper elevation={3} className={s.learn}>
        <div className={s.questionOrAnswer}>Question:</div>
        <div className={s.counter}>Количество попыток ответов на вопрос: {counter}</div>

        {isAnswered ? (
          <RateYourself setIsAnswered={setIsAnswered} />
        ) : (
          <Button variant="contained" sx={{ width: '373px', borderRadius: '50px' }} onClick={() => setIsAnswered(true)}>
            Show answer
          </Button>
        )}
      </Paper>
      <BackToPacksList />
    </div>
  )
}
