import React from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, styled, tableCellClasses } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import useModal from '../../../common/hook/useModal'
import { userId } from '../../auth/auth-selector'
import { PacksModal } from '../../modals/PacksModal/PacksModal'
import { DomainPackType } from '../packs-api'
import { deletePackTC } from '../packs-reducer'

type PacksTableBodyType = {
  packsCards: DomainPackType[]
}

export const PacksTableBody = (props: PacksTableBodyType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userIdLogin = useAppSelector(userId)
  const { isShowing, toggle } = useModal()

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
  // DELETE AND UPDATE PACK
  const deletePack = (_id: string) => {
    dispatch(deletePackTC(_id))
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
            {/*/ new Date(updated).toLocaleDateString()*/}
            <StyledTableCell align="left">{new Date(row.updated).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell align="left">{row.user_name}</StyledTableCell>
            <StyledTableCell align="left">
              {row.user_id === userIdLogin ? (
                <div>
                  <IconButton disabled={row.cardsCount === 0}>
                    <SchoolOutlinedIcon fontSize={'small'} />
                  </IconButton>
                  <IconButton onClick={toggle}>
                    <EditOutlinedIcon fontSize={'small'} />
                    <PacksModal titleName={'Edit pack'} open={isShowing} hide={toggle} id_pack={row._id} />
                  </IconButton>
                  <IconButton onClick={() => deletePack(row._id)}>
                    <DeleteOutlinedIcon fontSize={'small'} />
                  </IconButton>
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
