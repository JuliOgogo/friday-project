import React, { useEffect } from 'react'

import { Button, Rating, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { Order } from '../../common/components/EnhancedTableHead/EnhancedTableHead'

import { addCardTC, CardStateType, fetchCardsTC } from './cards-reducer'
import { cardPageSelector, cardsPageCountSelector, cardsSelector, cardsTotalCountSelector } from './cards-selector'

// column names
interface HeadCell {
  disablePadding: boolean
  id: keyof CardStateType
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'question',
    numeric: false,
    disablePadding: true,
    label: 'Question',
  },
  {
    id: 'answer',
    numeric: true,
    disablePadding: false,
    label: 'Answer',
  },
  {
    id: 'updated',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'grade',
    numeric: true,
    disablePadding: false,
    label: 'Grade',
  },
]

// // down sort function
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//
//   return 0
// }
//
// // up sort function
// type Order = 'asc' | 'desc'
//
// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }
//
// // Table Head
// interface EnhancedTableProps {
//   // numSelected: number
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
//   order: Order
//   orderBy: string
//   // rowCount: number
//   // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
// }
//
// const EnhancedTableHead = (props: EnhancedTableProps) => {
//   const { order, orderBy, onRequestSort } = props
//   const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//     onRequestSort(event, property)
//   }
//
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map(headCell => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   )
// }

// Cards Table
export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // selectors
  const rows = useAppSelector(cardsSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const cardsPageCount = useAppSelector(cardsPageCountSelector)
  const cardPage = useAppSelector(cardPageSelector)

  const { id_pack } = useParams()

  // local state
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof CardStateType>('question')

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    pageCount: '5',
  })

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CardStateType) => {
    if (property === 'cardsPack_id') {
      return
    }
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortCards', (isAsc ? 1 : 0) + property)
    // dispatch(changeSortCardsAC((isAsc ? 1 : 0) + property))
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    // dispatch(changeCardsPageAC(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())

    // dispatch(changeCardsCountAC(+event.target.value))
  }

  // button onClick
  const addNewCardHandler = () => {
    dispatch(
      addCardTC({
        cardsPack_id: id_pack ? id_pack : '',
        question: 'New Question',
        answer: 'New Answer',
        grade: 2,
      })
    )
  }

  const handleClick = (id_pack: string, id_card: string) => {
    navigate(`/packs/pack/${id_pack}/card/${id_card}`)
  }

  // for params
  // useEffect(() => {
  //   setSearchParams(searchParams)
  //
  //   // dispatch(fetchCardsTC(cardPage, cardsPageCount))
  // }, [cardPage, cardsPageCount])

  useEffect(() => {
    dispatch(fetchCardsTC(id_pack ? id_pack : ''))
  }, [])

  return (
    <div>
      <Button variant={'contained'} sx={{ width: '100%', borderRadius: '30px' }} onClick={addNewCardHandler}>
        {'Add new Card'}
      </Button>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            {/*<EnhancedTableHead*/}
            {/*  // numSelected={selected.length}*/}
            {/*  order={order}*/}
            {/*  orderBy={orderBy}*/}
            {/*  onRequestSort={handleRequestSort}*/}
            {/*  // rowCount={rows.length}*/}
            {/*/>*/}
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover tabIndex={-1} key={row._id} onClick={() => handleClick(row.cardsPack_id, row._id)}>
                    <TableCell id={labelId} scope="row">
                      {row.question}
                    </TableCell>
                    <TableCell align="right">{row.answer}</TableCell>
                    {/*<TableCell align="right">{new Date(row.updated).toLocaleDateString()}</TableCell>*/}
                    <TableCell align="right">{row.updated}</TableCell>
                    <TableCell align="right">{<Rating name="read-only" value={row.grade} readOnly />}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cardsTotalCount}
          rowsPerPage={cardsPageCount}
          page={cardPage ? cardPage - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
