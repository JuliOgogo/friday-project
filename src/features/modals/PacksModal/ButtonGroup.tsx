import React, { FC } from 'react'

import { Button } from '@mui/material'

export const ButtonGroup: FC<ButtonGroupType> = ({ hide, formikHandler }) => {
  return (
    <div>
      <Button onClick={hide} sx={{ width: '170px', mt: '60px' }}>
        Cancel
      </Button>
      <Button onClick={formikHandler} variant="contained" type={'submit'} color={'primary'} sx={{ width: '170px' }}>
        Save
      </Button>
    </div>
  )
}

type ButtonGroupType = {
  hide: () => void
  formikHandler: () => void
}
