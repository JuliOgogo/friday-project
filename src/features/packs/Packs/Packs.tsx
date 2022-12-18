import * as React from 'react'
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/routes/pathRoutesList'
import { changePage, fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector } from '../packs-selector'

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
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_name',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: '_id',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
]

interface Data {
  name: string
  cards: number
  last_updated: number
  created_by: string
  action: number
}

function createData(
  name: string,
  cards: number,
  last_updated: number,
  created_by: string,
  action: number
): Data {
  return { name, cards, last_updated, created_by, action }
}

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function Packs() {
  const dispatch = useAppDispatch()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    console.log('page', newPage)
    dispatch(changePage(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
    dispatch(fetchPacksTC())
  }, [pageState, packCountState])

  const rows = packsCards

  console.log(packsCards)

  return (
    <div>
      <Button
        href={`#${PATH.ADD_NEW_PACK}`}
        sx={{
          width: '113px',
          borderRadius: '50px',
        }}
      >
        {' '}
        add new pack
      </Button>
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
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
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
          page={pageState}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
