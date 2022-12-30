import React from 'react'

import { Rating } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/store'
import { userId } from '../../auth/auth-selector'
import { EditCardIcon } from '../../modals/CardsModal/EditCardIcon/EditCardIcon'
import { DeleteModalIcon } from '../../modals/DeleteModal/DeleteModalIcon/DeleteModalIcon'
import { CardStateType } from '../cards-reducer'

type CardsTableBodyType = {
  Cards: CardStateType[]
}
export const CardsTableBody = (props: CardsTableBodyType) => {
  const navigate = useNavigate()
  const userIdLogin = useAppSelector(userId)

  const handleClick = (id_pack: string, id_card: string) => {
    navigate(`/packs/pack/${id_pack}/card/${id_card}`)
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
                  <EditCardIcon
                    id_pack={row.cardsPack_id}
                    id_card={row._id}
                    cardQuestion={row.question}
                    cardAnswer={row.answer}
                  />
                  <DeleteModalIcon
                    titleName={'Delete Card'}
                    id_pack={row.cardsPack_id}
                    id_card={row._id}
                    name={row.question}
                  />
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
