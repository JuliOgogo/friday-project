import React from 'react'

import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'

import { CardsModal } from '../CardsModal'

import useModal from 'common/hook/useModal'

export const AddCardModal = () => {
  const { isShowing, toggle } = useModal()
  const { id_pack } = useParams()

  return (
    <>
      <Button variant={'contained'} sx={{ borderRadius: '30px' }} onClick={toggle}>
        Add new card
      </Button>
      <CardsModal titleName={'Add new card'} id_pack={id_pack ? id_pack : ''} open={isShowing} hide={toggle} />
    </>
  )
}
