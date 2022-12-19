import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { createPackTC, deletePackTC, getPackTC, updatePackTC } from './pack-reducer'

type PropsType = {
  name: string
  _id: string
}

const UpdateConmonent = ({ name, _id }: PropsType) => {
  const dispatch = useAppDispatch()
  const [isUpdate, setIsUpdate] = useState(false)
  const [inputName, setInputName] = useState(name)

  return (
    <div>
      {isUpdate ? (
        <input
          type={'text'}
          value={inputName}
          onChange={e => {
            setInputName(e.target.value)
          }}
        />
      ) : (
        <span
          onDoubleClick={() => {
            setIsUpdate(true)
          }}
        >
          {inputName}
        </span>
      )}

      <button
        onClick={() => {
          dispatch(deletePackTC(_id))
        }}
      >
        del
      </button>
      <button
        onClick={() => {
          dispatch(updatePackTC(inputName, _id))
          setIsUpdate(false)
        }}
      >
        update
      </button>
    </div>
  )
}

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
      <div>
        {packs.map((el: any) => (
          <UpdateConmonent key={el._id} name={el.name} _id={el._id} />
        ))}
      </div>
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
    </div>
  )
}
