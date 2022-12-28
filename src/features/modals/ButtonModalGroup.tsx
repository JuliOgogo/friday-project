import React, { FC } from 'react'

import { Button } from '@mui/material'

export const ButtonModalGroup: FC<ButtonGroupType> = ({ hide, onClickHandler, deleteButton }) => {
  const colorButton = deleteButton ? 'error' : 'primary'

  return (
    <div>
      <Button onClick={hide} sx={{ width: '130px', mt: '60px', textAlign: 'left' }}>
        Cancel
      </Button>
      <Button
        onClick={onClickHandler}
        variant="contained"
        type={'submit'}
        color={colorButton}
        sx={{ width: '130px', mt: '60px', ml: '130px', textAlign: 'right' }}
      >
        {deleteButton ? 'Delete' : 'Save'}
      </Button>
    </div>
  )
}

type ButtonGroupType = {
  hide: () => void
  onClickHandler: () => void
  deleteButton?: boolean
}
