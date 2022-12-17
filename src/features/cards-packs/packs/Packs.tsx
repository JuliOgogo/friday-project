import React, { useEffect } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { CreatePackTC, getPackTC } from './pack-reducer'

export const Packs = () => {
  const user_id = useAppSelector(state => state.auth.LoginParams._id)

  const getPack = () => {
    dispatch(getPackTC(user_id))
  }

  const dispatch = useAppDispatch()

  const packs = useAppSelector(state => state.pack.cardPacks)

  return (
    <div>
      PACK
      <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={getPack}>
        GET
      </Button>
      <div>{packs.map(el => el.name)}</div>
      <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={() => {}}>
        CREATE
      </Button>
      <Button
        variant={'outlined'}
        size={'small'}
        color={'secondary'}
        onClick={() => {
          console.log()
        }}
      >
        DELETE
      </Button>
    </div>
  )
}
