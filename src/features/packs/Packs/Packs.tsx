import React, { useEffect, useMemo, useState } from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, styled, tableCellClasses } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../../common/routes/pathRoutesList'
import { userId } from '../../auth/auth-selector'
import { DeleteModalIcon } from '../../modals/DeleteModal/DeleteModalIcon/DeleteModalIcon'
import { EditPackIcon } from '../../modals/PacksModal/EditPackIcon/EditPackIcon'
import { DomainPackType } from '../packs-api'
import { changeSortPacksAC, fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector, sortPacks } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'

import { isInitializedSelector } from 'app/app-selector'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Column, EnhancedTableHead, Order } from 'common/components/EnhancedTableHead/EnhancedTableHead'
import { PaginationTable } from 'common/components/PaginationTable/PaginationTable'

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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const packsCards = useAppSelector(packSelector)
  const pageState = useAppSelector(packPage)
  const packCountState = useAppSelector(packCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  const userIdLogin = useAppSelector(userId)
  const isInitialized = useAppSelector(isInitializedSelector)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof DomainPackType | ''>('')
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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DomainPackType) => {
    if (property === 'user_id') {
      return
    }
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortPacks', (isAsc ? 0 : 1) + property)
    setSearchParams(searchParams)

    dispatch(changeSortPacksAC((isAsc ? 0 : 1) + property))
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  let URLParam = useMemo(() => {
    const paramsSearch: any = {}

    searchParams.forEach((key, value) => {
      paramsSearch[value] = key
    })

    return paramsSearch
  }, [searchParams])

  // let URLParams = useMemo(
  //   () => ({
  //     packName: searchParams.get('packName') || undefined,
  //     min: Number(searchParams.get('min')) || undefined,
  //     max: Number(searchParams.get('max')) || undefined,
  //     page: Number(searchParams.get('page')) || undefined,
  //     pageCount: Number(searchParams.get('pageCount')) || undefined,
  //     sortPacks: searchParams.get('sortPacks') || undefined,
  //   }),
  //   [searchParams]
  // )
  // console.log('order',order)
  useEffect(() => {
    let orderParam = searchParams.get('sortPacks')

    if (orderParam) {
      setOrderBy(orderParam.substring(1) as keyof DomainPackType)
      setOrder(Number(orderParam.at(0)) ? 'asc' : 'desc')
    }
  }, [searchParams, order, orderBy])

  useEffect(() => {
    dispatch(fetchPacksTC(URLParam))
  }, [URLParam])

  const handleClick = (id_pack: string) => {
    navigate(`/packs/${id_pack}`)
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
              rowCount={packsCards?.length}
            />

            <TableBody>
              {packsCards?.map((row, index) => {
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
                          <IconButton disabled={row.cardsCount === 0} href={`#${PATH.LEARN}`}>
                            <SchoolOutlinedIcon fontSize={'small'} />
                          </IconButton>
                          <EditPackIcon id_pack={row._id} />
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
          </Table>
        </TableContainer>
      </Paper>
      <div>
        {/*<PaginationTable*/}
        {/*  count={cardPacksTotal}*/}
        {/*  component="div"*/}
        {/*  rowsPerPage={packCountState}*/}
        {/*  page={pageState ? pageState - 1 : 0}*/}
        {/*  rowsPerPageOptions={[4, 5, 10, 25]}*/}
        {/*  onPageChange={handleChangePage}*/}
        {/*  onRowsPerPageChange={handleChangeRowsPerPage}*/}
        {/*  sx={{*/}
        {/*    fontFamily: 'Montserrat',*/}
        {/*  }}*/}
        {/*/>*/}
        <PaginationTable pageCount={packCountState} totalCount={cardPacksTotal} page={pageState} />
      </div>
    </div>
  )
}
