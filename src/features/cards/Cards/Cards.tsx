import React, { useEffect, useMemo } from 'react'

import { Rating } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { PaginationTable } from '../../../common/components/PaginationTable/PaginationTable'
import { userId } from '../../auth/auth-selector'
import { EditCardIcon } from '../../modals/CardsModal/EditCardIcon/EditCardIcon'
import { DeleteModalIcon } from '../../modals/DeleteModal/DeleteModalIcon/DeleteModalIcon'
import { CardStateType, fetchCardsTC } from '../cards-reducer'
import { cardPageSelector, cardsPageCountSelector, cardsSelector, cardsTotalCountSelector } from '../cards-selector'
import { CardsHeader } from '../CardsHeader/CardsHeader'
import { CardsTableBody } from '../CardsTableBody/CardsTableBody'
import { HeadTablePacks } from '../HeadTableCards/HeadTableCards'

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

/*const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
}))*/

// Cards Table
export const Cards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // selectors
  const userIdLogin = useAppSelector(userId)
  const rows = useAppSelector(cardsSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const cardsPageCount = useAppSelector(cardsPageCountSelector)
  const cardPage = useAppSelector(cardPageSelector)

  const { id_pack } = useParams()

  // local state
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())
    setSearchParams(searchParams)
  }

  const handleClick = (id_pack: string, id_card: string) => {
    navigate(`/packs/pack/${id_pack}/card/${id_card}`)
  }

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
            <HeadTablePacks columns={columnsCards} packsCards={rows.length} />
            {/*<CardsTableBody Cards={rows} />*/}
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    <TableCell id={labelId} scope="row" onClick={() => handleClick(row.cardsPack_id, row._id)}>
                      {row.question}
                    </TableCell>
                    <TableCell align="left">{row.answer}</TableCell>
                    <TableCell align="left">{new Date(row.updated).toLocaleDateString()}</TableCell>
                    <TableCell align="left">{<Rating name="read-only" value={row.grade} readOnly />}</TableCell>
                    {row.user_id === userIdLogin ? (
                      <TableCell align="left">
                        <div>
                          <EditCardIcon
                            id_pack={row.cardsPack_id}
                            id_card={row._id}
                            cardQuestion={row.question}
                            cardAnswer={row.answer}
                          />
                          <DeleteModalIcon
                            titleName={'Delete Card'}
                            id_pack={row.cardsPack_id}
                            id_card={row._id}
                            name={row.question}
                          />
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell align="right"></TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cardsTotalCount}
          rowsPerPage={cardsPageCount}
          page={cardPage ? cardPage - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/*<PaginationTable pageCount={cardsPageCount} totalCount={cardsTotalCount} page={cardPage} />*/}
      </div>
    </div>
  )
}
