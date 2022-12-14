import React from 'react'

import { TextField, TextFieldProps } from '@mui/material'

type CustomInputPropsType = TextFieldProps & {
  value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomInput: React.FC<CustomInputPropsType> = ({ ...props }) => {
  return <TextField size={'small'} margin={'normal'} label="Email" variant="standard" {...props} />
}
