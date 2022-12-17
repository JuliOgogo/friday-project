import React from 'react'

import { ButtonProps } from '@mui/material'
import Button from '@mui/material/Button'

type ButtonCustomType = ButtonProps

export const CustomButton: React.FC<ButtonCustomType> = ({ className, ...props }) => {
  return (
    <Button
      variant="contained"
      type={'submit'}
      color={'primary'}
      sx={{
        width: '347px',
        borderRadius: '50px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '300',
        mt: '60px',
      }}
    >
      {props.children}
    </Button>
  )
}
