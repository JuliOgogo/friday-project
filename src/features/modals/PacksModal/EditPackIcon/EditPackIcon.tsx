import React, { FC } from 'react'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'

import { PacksModal } from '../PacksModal'

import useModal from 'common/hook/useModal'

export const EditPackIcon: FC<EditPackIconType> = ({ id_pack }) => {
  const { isShowing, toggle } = useModal()

  return (
    <IconButton onClick={toggle}>
      <EditOutlinedIcon fontSize={'small'} />
      <PacksModal titleName={'Edit pack'} open={isShowing} hide={toggle} id_pack={id_pack} />
    </IconButton>
  )
}

type EditPackIconType = {
  id_pack: string
}
