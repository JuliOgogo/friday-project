import React, { FC } from 'react'

import { Button } from '@mui/material'

import s from './Modal.module.css'

export const ButtonModalGroup: FC<ButtonGroupType> = ({ hide, onClickHandler, isDelete }) => {
  const colorButton = isDelete ? 'error' : 'primary'
  const style = {
    width: '127px',
    borderRadius: '50px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '300',
    mt: '60px',
  }

  return (
    <div className={s.buttonGroup}>
      <Button
        onClick={hide}
        sx={{
          ...style,
          color: '#000000',
          background: '#FCFCFC',
          boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
        }}
      >
        Cancel
      </Button>
      <Button onClick={onClickHandler} variant="contained" type={'submit'} color={colorButton} sx={style}>
        {isDelete ? 'Delete' : 'Save'}
      </Button>
    </div>
  )
}

type ButtonGroupType = {
  hide: () => void
  onClickHandler: () => void
  isDelete?: boolean
}
