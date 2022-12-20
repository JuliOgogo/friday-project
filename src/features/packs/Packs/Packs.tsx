import * as React from 'react'
import { useEffect } from 'react'


import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { Cards } from '../../cards/Cards'
import { fetchCardsTC } from '../../cards/cards-reducer'
import { changePage, fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'
import { EnhancedTableHead } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'

interface Column {
  id: 'name' | 'updated' | 'user_name' | 'cardsCount' | '_id'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
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
    id: '_id',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
]

interface Data2 {
  name: string
  updated: string
  user_name: string
  cardsCount: number
  _id: string
}

export default function Packs() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  type Order = 'asc' | 'desc'
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data2>('name')
  const [selected, setSelected] = React.useState<readonly string[]>([])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data2) => {
    const isAsc = orderBy === property && order === 'asc'
    console.log(property)
    console.log(isAsc)
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, page: number) => {
    // setPage(newPage)
    const newPage = page + 1

    console.log('page', newPage)
    dispatch(changePage(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setRowsPerPage(+event.target.value)
    // setPage(0)
    dispatch(changePage(+event.target.value))
  }
  const packsCards = useAppSelector(packSelector)
  const pageState = useAppSelector(packPage)
  const packCountState = useAppSelector(packCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)

  console.log('pageState', pageState)
  // console.log(packCountState)
  //console.log(cardPacksTotal)

  useEffect(() => {
    // const cards = dispatch()
    dispatch(fetchPacksTC())
  }, [pageState, packCountState])

  const rows = packsCards

  const handleClick = (id_cards: string) => {
    console.log(id_cards)
    navigate(`/cards/${id_cards}`)
    dispatch(fetchCardsTC(id_cards))
  }

  return (
    <div>
      <PacksHeader />

      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>


              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/*<EnhancedTableHead*/}
            {/*    numSelected={selected.length}*/}
            {/*    onRequestSort={handleRequestSort}*/}
            {/*    order={order}*/}
            {/*    orderBy={orderBy}*/}
            {/*    rowCount={rows.length}*/}

            {/*/>*/}
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      onClick={() => handleClick(row._id)}
                    >
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align} scope="row" >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // количество кат в колоде cardPacksTotalCount
          count={cardPacksTotal}
          rowsPerPage={packCountState}
          page={pageState ? pageState - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
