import React from 'react'

import Button from '@mui/material/Button'

import { useAppSelector } from '../../../../app/store'
import { CustomMenu } from '../../../../common/components/CustomMenu/CustomMenu'
import { userId } from '../../../auth/auth-selector'
import { packUserId } from '../../cards-selector'

import s from './HeaderTitle.module.css'

export const HeaderTitle = () => {
  const myId = useAppSelector(userId)
  const friendsId = useAppSelector(packUserId)
  const title = myId === friendsId ? 'My Pack' : "Friend's Pack"

  return (
    <div className={s.titleAndButton}>
      <div className={s.title}>
        <div>{title}</div>
        {title === 'My Pack' && <CustomMenu />}
      </div>
      {title === 'My Pack' ? (
        <Button variant={'contained'} sx={{ borderRadius: '30px' }} href={`#`}>
          Add new card
        </Button>
      ) : (
        <Button variant={'contained'} sx={{ borderRadius: '30px' }} href={`#`}>
          Learn to pack
        </Button>
      )}
    </div>
  )
}
