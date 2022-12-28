import React from 'react'

import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { CustomMenu } from '../../../../common/components/CustomMenu/CustomMenu'
import { userId } from '../../../auth/auth-selector'
import { addCardTC } from '../../cards-reducer'
import { packUserId } from '../../cards-selector'

import s from './HeaderTitle.module.css'

export const HeaderTitle = () => {
  const dispatch = useAppDispatch()
  const { id_pack } = useParams()

  const myId = useAppSelector(userId)
  const friendsId = useAppSelector(packUserId)
  const title = myId === friendsId ? 'My Pack' : "Friend's Pack"

  const addNewCardHandler = () => {
    dispatch(
      addCardTC({
        cardsPack_id: id_pack ? id_pack : '',
        question: 'New Question',
        answer: 'New Answer',
        grade: 2,
      })
    )
  }

  return (
    <div className={s.titleAndButton}>
      <div className={s.title}>
        <div>{title}</div>
        {title === 'My Pack' && <CustomMenu />}
      </div>
      {title === 'My Pack' ? (
        <Button variant={'contained'} sx={{ borderRadius: '30px' }} onClick={addNewCardHandler}>
          Add new card
        </Button>
      ) : (
        <Button variant={'contained'} sx={{ borderRadius: '30px', fontFamily: 'Montserrat, sans-serif' }}>
          Learn to pack
        </Button>
      )}
    </div>
  )
}
