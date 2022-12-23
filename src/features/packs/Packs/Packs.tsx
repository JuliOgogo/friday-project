import * as React from 'react'
import {useEffect} from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from '../../../app/store'
import {Column, EnhancedTableHead, Order} from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import {userId} from '../../auth/auth-selector'
import {Cards} from '../../cards/Cards'
import {fetchCardsTC} from '../../cards/cards-reducer'
import {changePageAC, changePageCountAC, changeSortPacksAC, DomainPackType, fetchPacksTC} from '../packs-reducer'
import {
    cardPacksTotalCount,
    packCount,
    packPage,
    packSelector,
    sortPacks,
} from '../packs-selector'
import {PacksHeader} from '../PacksHeader/PacksHeader'

const columns: Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'cardsCount', label: 'Cards', minWidth: 100},
    {
        id: 'updated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'user_name',
        label: 'Created by',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'user_id',
        label: 'Action',
        minWidth: 170,
        align: 'right',
    },
]

export default function Packs() {
    let navigate = useNavigate()
    const dispatch = useAppDispatch()
    const packsCards = useAppSelector(packSelector)
    const pageState = useAppSelector(packPage)
    const packCountState = useAppSelector(packCount)
    const cardPacksTotal = useAppSelector(cardPacksTotalCount)
    const userIdLogin = useAppSelector(userId)
    const sortPacksUse = useAppSelector(sortPacks)


    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof DomainPackType>('updated')
    const [searchParams, setSearchParams] = useSearchParams({pageCount: '5'})

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DomainPackType) => {
        if (property === 'user_id') {
            return
        }
        const isAsc = orderBy === property && order === 'asc'

        searchParams.set('sortPacks', (isAsc ? 1 : 0) + property)
        dispatch(changeSortPacksAC((isAsc ? 1 : 0) + property))
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, page: number) => {
        const newPage = page + 1

        searchParams.set('page', newPage.toString())
        dispatch(changePageAC(newPage))
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('pageCount', event.target.value.toString())

        dispatch(changePageCountAC(+event.target.value))
    }

    const paramsSearch: any = {}

    searchParams.forEach((key, value) => {
        if (value === 'page') {
            paramsSearch[value] = Number(key)
        }
        paramsSearch[value] = key
    })
    useEffect(() => {
        setSearchParams(searchParams)
        // if(searchParams.get('sortPacks')){
        //     const sortPacks = searchParams.get('sortPacks')
        //     setOrderBy(sortPacks)
        // }

        dispatch(fetchPacksTC(paramsSearch))
    }, [pageState, packCountState, sortPacksUse])


    const rows = packsCards

    const handleClick = (id_cards: string) => {
        navigate(`/cards`)
        dispatch(fetchCardsTC(id_cards))
    }

    return (
        <div>
            <PacksHeader/>

            <Paper sx={{width: '100%', overflow: 'hidden', mt: '60px'}}>
                <TableContainer sx={{maxHeight: 840}}>
                    <Table stickyHeader aria-label="sticky table">
                        <EnhancedTableHead
                            columnsHead={columns}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow hover tabIndex={-1} key={row._id} onClick={() => handleClick(row._id)}>
                                        <TableCell id={labelId} scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.cardsCount}</TableCell>
                                        {/*/ new Date(updated).toLocaleDateString()*/}
                                        <TableCell
                                            align="right">{new Date(row.updated).toLocaleDateString()}</TableCell>
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
