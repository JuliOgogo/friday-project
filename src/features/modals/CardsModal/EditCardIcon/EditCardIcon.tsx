import React, { FC } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'

import { CardsModal } from '../CardsModal'

import useModal from 'common/hook/useModal'

export const EditCardIcon: FC<EditCardIconType> = ({ id_pack, id_card }) => {
  const { isShowing, toggle } = useModal()

  return (
    <IconButton onClick={toggle}>
      <EditOutlinedIcon fontSize={'small'} />
      <CardsModal titleName={'Edit card'} id_pack={id_pack} id_card={id_card} open={isShowing} hide={toggle} />
    </IconButton>
  )
}

type EditCardIconType = {
  id_pack: string
  id_card: string
}
