import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const BaseModal: FC<BaseModalType> = ({ children, text }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <div>
      <Button onClick={handleOpen}>{text}</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

type BaseModalType = {
  children: React.ReactNode
  text: string
}
