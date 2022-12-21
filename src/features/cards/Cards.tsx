import * as React from 'react'
import { useEffect } from 'react'

import { Button, Rating } from '@mui/material'
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
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { addCardTC, fetchCardsTC } from './cards-reducer'
import {
  cardPageSelector,
  cardsPacksIdSelector,
  cardsPageCountSelector,
  cardsSelector,
  cardsTotalCountSelector,
} from './cards-selector'

interface Data {
  question: string
  answer: string
  updated: string
  grade: number
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
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

interface EnhancedTableProps {
  // numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
//   const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//     onRequestSort(event, property)
//   }

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/*<TableCell padding="checkbox">*/}
        {/*    <Checkbox*/}
        {/*        color="primary"*/}
        {/*        indeterminate={numSelected > 0 && numSelected < rowCount}*/}
        {/*        checked={rowCount > 0 && numSelected === rowCount}*/}
        {/*        onChange={onSelectAllClick}*/}
        {/*        inputProps={{*/}
        {/*            'aria-label': 'select all desserts',*/}
        {/*        }}*/}
        {/*    />*/}
        {/*</TableCell>*/}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // selectors
  const rows = useAppSelector(cardsSelector)
  // const rows = cards

  const cardsTotal = useAppSelector(cardsTotalCountSelector)
  const cardCount = useAppSelector(cardsPageCountSelector)
  const cardPage = useAppSelector(cardPageSelector)
  const cardsPacksId = useAppSelector(cardsPacksIdSelector)

  // local state
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('question')
  // const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // sort functions
  const [searchParams, setSearchParams] = useSearchParams({
    page: cardPage.toString(),
    pageCount: cardCount.toString(),
    // sortPacks: '0updated',
  })

  const paramsSearch: any = {}

  searchParams.forEach((key, value) => {
    paramsSearch[value] = key
  })

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    // setPage(newPage)
    // const newPage = page + 1

    searchParams.set('page', newPage.toString())
    // dispatch(changePageAC(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRowsPerPage(parseInt(event.target.value, 10))
    // setPage(0)
    searchParams.set('pageCount', event.target.value.toString())
    // dispatch(changePageCountAC(+event.target.value))
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    setSearchParams(searchParams)

    dispatch(fetchCardsTC(cardsPacksId))
  }, [rows])

  // const handleClick = (id_cards: string) => {
  //   console.log(id_cards)
  //   navigate(`/cards`)
  //   dispatch(fetchCardsTC(id_cards))
  // }

  const addNewCardHandler = () => {
    dispatch(
      addCardTC({
        cardsPack_id: cardsPacksId,
        question: 'New Question',
        answer: 'New Answer',
        // grade: 0,
        // shots: 0,
        // questionImg: '',
        // questionVideo: '',
        // answerImg: '',
        // answerVideo: '',
      })
    )
  }

  return (
    <div>
      <Button variant={'contained'} sx={{ width: '100%', borderRadius: '30px' }} onClick={addNewCardHandler}>
        {'Add new Card'}
      </Button>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            // sx={{ minWidth: 750 }}
            // aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.question)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.question}
                      // onClick={event => handleClick(event)}

                      // onClick={event => handleClick(event, row.question)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      // selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.question}
                      </TableCell>
                      <TableCell align="right">{row.answer}</TableCell>
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
          // count={rows.length}
          // rowsPerPage={rowsPerPage}
          // page={page}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          count={cardsTotal}
          rowsPerPage={cardCount}
          page={cardPage ? cardPage - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
