import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { EnhancedTableHead } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import { userId } from '../../auth/auth-selector'
import { Cards } from '../../cards/Cards'
import { fetchCardsTC } from '../../cards/cards-reducer'
import { changePageAC, changePageCountAC, fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'

interface Column {
  id: 'name' | 'updated' | 'user_name' | 'cardsCount' | 'user_id'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cardsCount', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_name',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_id',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
]

interface Data {
  name: string
  updated: string
  user_name: string
  cardsCount: number
  user_id: string
}

export default function Packs() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()

  type Order = 'asc' | 'desc'
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('updated')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  // это параметры можно вытащить из state
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    pageCount: '5',
    sortPacks: '0updated',
  })
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortPacks', 0 + property)
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, page: number) => {
    // setPage(newPage)
    const newPage = page + 1

    // setSearchParams({ page: newPage.toString() })
    //searchParams.delete('page')
    searchParams.set('page', newPage.toString())
    dispatch(changePageAC(newPage))
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setRowsPerPage(+event.target.value)
    // setPage(0)
    //searchParams.delete('pageCount')
    searchParams.set('pageCount', event.target.value.toString())

    dispatch(changePageCountAC(+event.target.value))
  }

  const packsCards = useAppSelector(packSelector)
  const pageState = useAppSelector(packPage)
  const packCountState = useAppSelector(packCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  const userIdLogin = useAppSelector(userId)

  const paramsSearch: any = {}

  searchParams.forEach((key, value) => {
    paramsSearch[value] = key
  })

  useEffect(() => {
    setSearchParams(searchParams)

    dispatch(fetchPacksTC(paramsSearch))
  }, [pageState, packCountState])

  const rows = packsCards

  const handleClick = (id_cards: string) => {
    console.log(id_cards)
    navigate(`/cards`)
    dispatch(fetchCardsTC(id_cards))
  }

  return (
    <div>
      <PacksHeader />

      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            {/*<TableHead>*/}
            {/*  <TableRow>*/}
            {/*    {columns.map(column => (*/}
            {/*      <TableCell*/}
            {/*        key={column.id}*/}
            {/*        align={column.align}*/}
            {/*        style={{ minWidth: column.minWidth }}*/}
            {/*      >*/}
            {/*        {column.label}*/}
            {/*      </TableCell>*/}
            {/*    ))}*/}
            {/*  </TableRow>*/}
            {/*</TableHead>*/}
            <EnhancedTableHead
              columnsHead={columns}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                      onClick={() => handleClick(row._id)}
                    >
                      {/*{columns.map(column => {*/}
                      {/*  const value = row[column.id]*/}
                      {/*  console.log(value)*/}

                      {/*  return (*/}
                      {/*    <TableCell key={column.id} align={column.align} scope="row">*/}
                      {/*      {column.format && typeof value === 'number'*/}
                      {/*        ? column.format(value)*/}
                      {/*        : value}*/}
                      {/*    </TableCell>*/}

                      {/*  )*/}
                      {/*})}*/}
                      <TableCell id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.cardsCount}</TableCell>
                      <TableCell align="right">{row.updated}</TableCell>
                      <TableCell align="right">{row.user_name}</TableCell>
                      <TableCell align="right">
                        {row.user_id === userIdLogin ? <div>You</div> : <div> no you</div>}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // количество карт в колоде cardPacksTotalCount
          count={cardPacksTotal}
          rowsPerPage={packCountState}
          page={pageState ? pageState - 1 : 0}
          //
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
