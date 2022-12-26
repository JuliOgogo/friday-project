import React, { useEffect, useMemo, useState } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, styled, tableCellClasses } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Column, EnhancedTableHead, Order } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import { userId } from '../../auth/auth-selector'
import { Cards } from '../../cards/Cards'
import {
  changePageAC,
  changePageCountAC,
  changeSortPacksAC,
  deletePackTC,
  fetchPacksTC,
  updatePackTC,
} from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector, sortPacks } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'
import {isInitializedSelector} from "../../../app/app-selector";
import {DomainPackType} from "../packs-api";

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cardsCount', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'user_name',
    label: 'Created by',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'user_id',
    label: 'Action',
    minWidth: 170,
    align: 'left',
  },
]

export default function Packs() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const packsCards = useAppSelector(packSelector)
  const pageState = useAppSelector(packPage)
  const packCountState = useAppSelector(packCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  const userIdLogin = useAppSelector(userId)
  let isInitialized = useAppSelector(isInitializedSelector)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof DomainPackType >('updated')
  const [searchParams, setSearchParams] = useSearchParams()


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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DomainPackType ) => {
    if (property === 'user_id') {
      return
    }
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortPacks', (isAsc ? 1 : 0) + property)
    setSearchParams(searchParams)

    dispatch(changeSortPacksAC((isAsc ? 1 : 0) + property))
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)

    dispatch(changePageAC(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())
    setSearchParams(searchParams)
    dispatch(changePageCountAC(+event.target.value))
  }

  let URLParams = useMemo(
    () => ({
      packName: searchParams.get('packName') || undefined,
      min: Number(searchParams.get('min')) || undefined,
      max: Number(searchParams.get('max')) || undefined,
      page: Number(searchParams.get('page')) || undefined,
      pageCount: Number(searchParams.get('pageCount')) || undefined,
      sortPacks: searchParams.get('sortPacks') || undefined,
    }),
    [searchParams]
  )

  useEffect(() => {
    dispatch(fetchPacksTC(URLParams))
  }, [URLParams])

  const rows = packsCards

  const handleClick = (id_pack: string) => {
    navigate(`/packs/${id_pack}`)
  }

  // DELETE AND UPDATE PACK
  const deletePack = (_id: string) => {
    dispatch(deletePackTC(_id))
  }
  const updatePack = (name: string, pack_id: string) => {
    let newName = 'new name'

    dispatch(updatePackTC(newName, pack_id))
  }


  return (
    <div>
      <PacksHeader />
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              columnsHead={columns}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy.toString()}
              rowCount={rows.length}
            />

            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    <StyledTableCell
                      id={labelId}
                      scope="row"
                      onClick={() => handleClick(row._id)}
                      sx={{ cursor: 'pointer' }}
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
                          <IconButton onClick={() => updatePack(row.name, row._id)}>
                            <EditOutlinedIcon fontSize={'small'} />
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
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <TablePagination
          count={cardPacksTotal}
          component="div"
          rowsPerPage={packCountState}
          page={pageState ? pageState - 1 : 0}
          rowsPerPageOptions={[4, 5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            fontFamily: 'Montserrat',
          }}
        />
      </div>
    </div>
  )
}
