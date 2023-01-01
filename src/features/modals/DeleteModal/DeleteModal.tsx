import React, { FC } from 'react'

import { deleteCardTC } from '../../cards/cards-reducer'
import { deletePackTC } from '../../packs/packs-reducer'
import { BaseModal } from '../BaseModal/BaseModal'
import { ButtonModalGroup } from '../ButtonModalGroup'
import s from '../Modal.module.css'

import { useAppDispatch } from 'app/store'

export const DeleteModal: FC<DeleteModalType> = ({ titleName, open, name, hide, id_pack, id_card }) => {
  const dispatch = useAppDispatch()
  const deleteHandler = () => {
    if (titleName === 'Delete Pack') {
      dispatch(deletePackTC(id_pack))
      hide()
    } else if (titleName === 'Delete Card') {
      dispatch(deleteCardTC(id_pack, id_card ? id_card : ''))
      hide()
    }
  }
  let message: string

  titleName === 'Delete Pack' ? (message = 'All cards will be deleted') : (message = 'Card will be deleted')

  return (
    <>
      <BaseModal open={open} titleName={titleName} hide={hide}>
        <p className={s.label}>{`Do you really want to remove '${name}'? ${message}`} </p>
        <ButtonModalGroup hide={hide} isDelete={true} onClickHandler={deleteHandler} />
      </BaseModal>
    </>
  )
}

type DeleteModalType = {
  titleName: string
  open: boolean
  name: string
  hide: () => void
  id_pack: string
  id_card?: string
}
