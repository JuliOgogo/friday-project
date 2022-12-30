import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Rating } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { userId } from '../../auth/auth-selector'
import { CardStateType, deleteCardTC, updateCardTC } from '../cards-reducer'
type CardsTableBodyType = {
  Cards: CardStateType[]
}
export const CardsTableBody = (props: CardsTableBodyType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userIdLogin = useAppSelector(userId)
  // choose card
  const handleClick = (id_pack: string, id_card: string) => {
    navigate(`/packs/pack/${id_pack}/card/${id_card}`)
  }

  // delete and update card
  const deleteCard = (id_pack: string, id_card: string) => {
    dispatch(deleteCardTC(id_pack, id_card))
  }
  const updateCard = (id_pack: string, id_card: string) => {
    dispatch(updateCardTC(id_pack, { _id: id_card ? id_card : '', question: 'Updated' }))
  }

  return (
    <TableBody>
      {props.Cards?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow hover tabIndex={-1} key={row._id}>
            <TableCell id={labelId} scope="row" onClick={() => handleClick(row.cardsPack_id, row._id)}>
              {row.question}
            </TableCell>
            <TableCell align="left">{row.answer}</TableCell>
            <TableCell align="left">{new Date(row.updated).toLocaleDateString()}</TableCell>
            <TableCell align="left">{<Rating name="read-only" value={row.grade} readOnly />}</TableCell>
            {row.user_id === userIdLogin ? (
              <TableCell align="left">
                <div>
                  <IconButton onClick={() => updateCard(row.cardsPack_id, row._id)}>
                    <EditOutlinedIcon fontSize={'small'} />
                  </IconButton>
                  <IconButton onClick={() => deleteCard(row.cardsPack_id, row._id)}>
                    <DeleteOutlinedIcon fontSize={'small'} />
                  </IconButton>
                </div>
              </TableCell>
            ) : (
              <TableCell align="right"></TableCell>
            )}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
