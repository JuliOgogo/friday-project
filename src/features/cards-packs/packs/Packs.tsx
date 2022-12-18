import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { createPackTC, getPackTC } from './pack-reducer'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [checkValue, setCheckValue] = useState(false)

  const user_id = useAppSelector(state => state.auth.LoginParams._id)
  const packs = useAppSelector(state => state.pack.cardPacks)

  useEffect(() => {
    dispatch(getPackTC(user_id))
  }, [])

  const getPack = () => {
    dispatch(getPackTC(user_id))
  }

  const createPack = () => {
    dispatch(createPackTC(value, checkValue))
    setValue('')
    setCheckValue(false)
  }

  return (
    <div>
      PACK
      <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={getPack}>
        GET
      </Button>
      <div>{packs.map((el: any) => el.name)}</div>
      <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={createPack}>
        CREATE
      </Button>
      <input
        type={'text'}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      <input
        type={'checkbox'}
        checked={checkValue}
        onChange={e => {
          setCheckValue(e.target.checked)
        }}
      />
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
