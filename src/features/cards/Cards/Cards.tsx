import React, { useEffect, useMemo } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useParams, useSearchParams } from 'react-router-dom'

import { PaginationTable } from '../../../common/components/PaginationTable/PaginationTable'
import { fetchCardsTC } from '../cards-reducer'
import { cardPageSelector, cardsPageCountSelector, cardsSelector, cardsTotalCountSelector } from '../cards-selector'
import { CardsHeader } from '../CardsHeader/CardsHeader'
import { CardsTableBody } from '../CardsTableBody/CardsTableBody'
import { HeadTableCards } from '../HeadTableCards/HeadTableCards'

import { useAppDispatch, useAppSelector } from 'app/store'
import { Column } from 'common/components/EnhancedTableHead/EnhancedTableHead'

// column names

const columnsCards: Column[] = [
  {
    id: 'question',
    minWidth: 170,
    label: 'Question',
    align: 'left',
  },
  {
    id: 'answer',
    minWidth: 100,
    label: 'Answer',
    align: 'left',
  },
  {
    id: 'updated',
    minWidth: 170,
    label: 'Last Updated',
    align: 'left',
  },
  {
    id: 'grade',
    minWidth: 170,
    label: 'Grade',
    align: 'left',
  },
  {
    id: '_id',
    label: 'Action',
    minWidth: 90,
    align: 'left',
  },
]

// Cards Table
export const Cards = () => {
  const dispatch = useAppDispatch()

  // selectors
  const rows = useAppSelector(cardsSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const cardsPageCount = useAppSelector(cardsPageCountSelector)
  const cardPage = useAppSelector(cardPageSelector)

  const { id_pack } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  let URLParams = useMemo(
    () => ({
      cardsPack_id: id_pack ? id_pack : '',
      page: Number(searchParams.get('page')) || undefined,
      pageCount: Number(searchParams.get('pageCount')) || undefined,
      sortCards: searchParams.get('sortCards') || undefined,
      cardQuestion: searchParams.get('cardQuestion') || undefined,
    }),
    [searchParams]
  )

  useEffect(() => {
    dispatch(fetchCardsTC(URLParams))
  }, [URLParams])

  return (
    <div style={{ width: '1043px' }}>
      <CardsHeader />
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <HeadTableCards columns={columnsCards} packsCards={rows.length} />
            <CardsTableBody Cards={rows} />
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <PaginationTable pageCount={cardsPageCount} totalCount={cardsTotalCount} page={cardPage} />
      </div>
    </div>
  )
}
