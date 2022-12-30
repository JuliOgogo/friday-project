import React from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, styled, tableCellClasses } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/store'
import { userId } from '../../auth/auth-selector'
import { DeleteModalIcon } from '../../modals/DeleteModal/DeleteModalIcon/DeleteModalIcon'
import { EditPackIcon } from '../../modals/PacksModal/EditPackIcon/EditPackIcon'
import { DomainPackType } from '../packs-api'

type PacksTableBodyType = {
  packsCards: DomainPackType[]
}

export const PacksTableBody = (props: PacksTableBodyType) => {
  const navigate = useNavigate()
  const userIdLogin = useAppSelector(userId)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Montserrat',
    },
  }))

  const handleClick = (id_pack: string) => {
    navigate(`/packs/${id_pack}`)
  }

  const handleLearnClick = (id_pack: string) => {
    navigate(`/packs/pack/${id_pack}/learn`)
  }

  return (
    <TableBody>
      {props.packsCards?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow hover tabIndex={-1} key={row._id}>
            <StyledTableCell
              id={labelId}
              scope="row"
              onClick={() => handleClick(row._id)}
              sx={{ cursor: 'pointer', wordWrap: 'break-word' }}
            >
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="left">{row.cardsCount}</StyledTableCell>
            <StyledTableCell align="left">{new Date(row.updated).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell align="left">{row.user_name}</StyledTableCell>
            <StyledTableCell align="left">
              {row.user_id === userIdLogin ? (
                <div>
                  <IconButton disabled={row.cardsCount === 0} onClick={() => handleLearnClick(row._id)}>
                    <SchoolOutlinedIcon fontSize={'small'} />
                  </IconButton>
                  <EditPackIcon id_pack={row._id} packName={row.name} />
                  <DeleteModalIcon titleName={'Delete Pack'} id_pack={row._id} name={row.name} />
                </div>
              ) : (
                <div>
                  <IconButton disabled={row.cardsCount === 0}>
                    <SchoolOutlinedIcon fontSize={'small'} />
                  </IconButton>
                </div>
              )}
            </StyledTableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
