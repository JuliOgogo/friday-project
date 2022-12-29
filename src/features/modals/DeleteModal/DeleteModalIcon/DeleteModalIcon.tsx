import React, { FC } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton } from '@mui/material'

import { DeleteModal } from '../DeleteModal'

import useModal from 'common/hook/useModal'

export const DeleteModalIcon: FC<DeleteModalIconType> = ({ titleName, id_pack, id_card, name }) => {
  const { isShowing, toggle } = useModal()

  return (
    <IconButton onClick={toggle}>
      <DeleteOutlinedIcon fontSize={'small'} />
      <DeleteModal
        titleName={titleName}
        open={isShowing}
        hide={toggle}
        id_pack={id_pack}
        id_card={id_card}
        name={name}
      />
    </IconButton>
  )
}

type DeleteModalIconType = {
  titleName: string
  id_pack: string
  id_card?: string
  name: string
}
