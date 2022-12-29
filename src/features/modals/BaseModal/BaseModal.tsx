import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

export const BaseModal: FC<BaseModalType> = ({ children, open }) => {
  return (
    <Modal open={open}>
      <Box
        onClick={e => {
          e.stopPropagation()
        }}
        sx={style}
      >
        {children}
      </Box>
    </Modal>
  )
}

type BaseModalType = {
  children: React.ReactNode
  open: boolean
}
