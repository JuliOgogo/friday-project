import React from 'react'

import Button from '@mui/material/Button'

import { PacksModal } from '../PacksModal'

import useModal from 'common/hook/useModal'

export const AddPackModal = () => {
  const { isShowing, toggle } = useModal()

  return (
    <>
      <Button
        variant={'contained'}
        sx={{ borderRadius: '30px', fontFamily: 'Montserrat, sans-serif' }}
        onClick={toggle}
      >
        Add new pack
      </Button>
      <PacksModal titleName={'Add new pack'} open={isShowing} hide={toggle} />
    </>
  )
}
