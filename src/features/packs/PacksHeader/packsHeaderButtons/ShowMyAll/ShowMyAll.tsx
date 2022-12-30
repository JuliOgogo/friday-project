import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../../../app/store'
import { userId } from '../../../../auth/auth-selector'
import s2 from '../commonStyles.module.css'

import s from './ShowMyAll.module.css'

type showMyAllType = {
  noFilterStatus: boolean
}

export const ShowMyAll = (props: showMyAllType) => {
  const userIdPack = useAppSelector(userId)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMyPack, setIsMyPack] = useState<boolean>()
  const [isAllPack, setIsAllPack] = useState<boolean>()

  useEffect(() => {
    if (searchParams.get('user_id')) {
      setIsMyPack(true)
    } else {
      setIsMyPack(false)
    }
    if (props.noFilterStatus) {
      setIsMyPack(false)
      setIsAllPack(false)
    }
  }, [props.noFilterStatus])

  const onChangeHandlerMyPacks = () => {
    setSearchParams({ user_id: userIdPack })
    setIsMyPack(true)
    setIsAllPack(false)
  }
  const onChangeHandlerALLPacks = () => {
    setSearchParams({})
    setIsAllPack(true)
    setIsMyPack(false)
  }

  return (
    <div className={s2.wrapper}>
      <div className={s2.text}>Show packs cards</div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button
          className={s.button}
          onClick={onChangeHandlerMyPacks}
          disabled={isMyPack}
          style={{
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          My
        </Button>
        <Button
          className={s.button}
          onClick={onChangeHandlerALLPacks}
          disabled={isAllPack}
          style={{
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          All
        </Button>
      </ButtonGroup>
    </div>
  )
}
