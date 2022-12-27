import React from 'react'

import { Button, Paper } from '@mui/material'

import { BackToPacksList } from '../../common/components/BackToPacksList/BackToPacksList'

import s from './Learn.module.css'

type LearnPropsType = {}

export const Learn: React.FC<LearnPropsType> = ({}) => {
  const packName = 'Pack Name' // useAppSelector(state => state.packs.cardPacks.find(packs => packs))
  const counter = 10 // useAppSelector(state => state.packs.cardPacks.find(packs => packs))

  return (
    <div>
      <div className={s.title}>Learn {packName}</div>
      <Paper elevation={3} className={s.learn}>
        <div className={s.question}>Question:</div>
        <div className={s.counter}>Количество попыток ответов на вопрос: {counter}</div>
        <Button
          variant="contained"
          sx={{
            width: '373px',
            borderRadius: '50px',
          }}
        >
          Show answer
        </Button>
      </Paper>
      <BackToPacksList />
    </div>
  )
}
