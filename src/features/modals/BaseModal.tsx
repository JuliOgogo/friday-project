import React, { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import s from './Modal.module.css'

import { Title } from 'common/components/Title/Title'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // height: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  boxSizing: 'border - box',
}

export const BaseModal: FC<BaseModalType> = ({ children, open, titleName, hide }) => {
  return (
    <Modal open={open}>
      <Box
        onClick={e => {
          e.stopPropagation()
        }}
        sx={style}
      >
        <div className={s.head}>
          <Title text={titleName} />
          <IconButton onClick={hide} className={s.iconButton}>
            <CloseIcon fontSize={'large'} />
          </IconButton>
        </div>
        <hr />
        {children}
      </Box>
    </Modal>
  )
}

type BaseModalType = {
  children: React.ReactNode
  open: boolean
  titleName: string
  hide: () => void
}
