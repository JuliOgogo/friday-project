import React, { FC } from 'react'

import { Button } from '@mui/material'

export const ButtonModalGroup: FC<ButtonGroupType> = ({ hide, onClickHandler, isDelete }) => {
  const colorButton = isDelete ? 'error' : 'primary'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Button
        onClick={hide}
        sx={{
          width: '127px',
          color: '#000000',
          background: '#FCFCFC',
          boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
          borderRadius: '50px',
          fontFamily: 'Montserrat, sans-serif',
          mt: '60px',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onClickHandler}
        variant="contained"
        type={'submit'}
        color={colorButton}
        sx={{
          width: '127px',
          borderRadius: '50px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '300',
          mt: '60px',
        }}
      >
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
