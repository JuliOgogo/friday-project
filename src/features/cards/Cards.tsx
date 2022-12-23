import React, { useEffect, useState } from 'react'

import { Button, Rating } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { Column, EnhancedTableHead, Order } from '../../common/components/EnhancedTableHead/EnhancedTableHead'

import {
  addCardTC,
  CardStateType,
  changeCardsPageAC,
  changeCardsPageCountAC,
  changeSortCardsAC,
  fetchCardsTC,
} from './cards-reducer'
import { cardPageSelector, cardsPageCountSelector, cardsSelector, cardsTotalCountSelector } from './cards-selector'

// column names

const columnsCards: Column[] = [
  {
    id: 'question',
    minWidth: 170,
    label: 'Question',
  },
  {
    id: 'answer',
    minWidth: 100,
    label: 'Answer',
  },
  {
    id: 'updated',
    minWidth: 170,
    label: 'Last Updated',
  },
  {
    id: 'grade',
    minWidth: 170,
    label: 'Grade',
  },
]

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
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof CardStateType>('question')

  const [searchParams, setSearchParams] = useSearchParams({
    pageCount: '5',
  })

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CardStateType) => {
    if (property === 'cardsPack_id') {
      return
    }
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortCards', (isAsc ? 1 : 0) + property)
    dispatch(changeSortCardsAC((isAsc ? 1 : 0) + property))
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    dispatch(changeCardsPageAC(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())

    dispatch(changeCardsPageCountAC(+event.target.value))
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

  // useEffect for params

  // useEffect(() => {
  //   setSearchParams(searchParams)
  //
  //   // dispatch(fetchCardsTC(cardPage, cardsPageCount))
  // }, [cardPage, cardsPageCount])

  useEffect(() => {
    dispatch(fetchCardsTC({ cardsPack_id: id_pack ? id_pack : '' }))
  }, [])

  return (
    <div>
      <Button variant={'contained'} sx={{ width: '100%', borderRadius: '30px' }} onClick={addNewCardHandler}>
        {'Add new Card'}
      </Button>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              columnsHead={columnsCards}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
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
