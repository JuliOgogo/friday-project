import React, { useEffect, useMemo } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Rating } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { userId } from '../../auth/auth-selector'
import { deleteCardTC, fetchCardsTC, updateCardTC } from '../cards-reducer'
import { cardPageSelector, cardsPageCountSelector, cardsSelector, cardsTotalCountSelector } from '../cards-selector'
import { CardsHeader } from '../CardsHeader/CardsHeader'
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
  // const [order, setOrder] = useState<Order>('asc')
  // const [orderBy, setOrderBy] = useState<keyof CardStateType>('question')
  const [searchParams, setSearchParams] = useSearchParams()

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CardStateType) => {
  //   if (property === 'cardsPack_id') {
  //     return
  //   }
  //   const isAsc = orderBy === property && order === 'asc'
  //
  //   searchParams.set('sortCards', (isAsc ? 1 : 0) + property)
  //   setSearchParams(searchParams)
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(property)
  // }

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())
    setSearchParams(searchParams)
  }

  // choose card
  const handleClick = (id_pack: string, id_card: string) => {
    navigate(`/packs/pack/${id_pack}/card/${id_card}`)
  }

  // delete and update card
  const deleteCard = (id_pack: string, id_card: string) => {
    dispatch(deleteCardTC(id_pack, id_card))
  }
  const updateCard = (id_pack: string, id_card: string) => {
    dispatch(updateCardTC(id_pack, { _id: id_card ? id_card : '', question: 'Updated' }))
  }

  let URLParams = useMemo(
    () => ({
      cardsPack_id: id_pack ? id_pack : '',
      page: Number(searchParams.get('page')),
      pageCount: Number(searchParams.get('pageCount')),
      sortCards: searchParams.get('sortCards') || '',
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
                          <IconButton onClick={() => updateCard(row.cardsPack_id, row._id)}>
                            <EditOutlinedIcon fontSize={'small'} />
                          </IconButton>
                          <IconButton onClick={() => deleteCard(row.cardsPack_id, row._id)}>
                            <DeleteOutlinedIcon fontSize={'small'} />
                          </IconButton>
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
      </div>
    </div>
  )
}
