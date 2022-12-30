import React, { useEffect, useMemo } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { isInitializedSelector } from '../../../app/app-selector'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Column } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import { PaginationTable } from '../../../common/components/PaginationTable/PaginationTable'
import { HeadTablePacks } from '../HeadTablePacks/HeadTablePacks'
import { fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector, sortPacks } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'
import { PacksTableBody } from '../PacksTableBody/PacksTableBody'

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cardsCount', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'user_name',
    label: 'Created by',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'user_id',
    label: 'Action',
    minWidth: 170,
    align: 'left',
  },
]

export default function Packs() {
  const dispatch = useAppDispatch()
  const packsCards = useAppSelector(packSelector)
  const pageState = useAppSelector(packPage)
  const packCountState = useAppSelector(packCount)
  const cardPacksTotal = useAppSelector(cardPacksTotalCount)
  const isInitialized = useAppSelector(isInitializedSelector)

  const [searchParams, setSearchParams] = useSearchParams()

  let URLParam = useMemo(() => {
    const paramsSearch: any = {}

    searchParams.forEach((key, value) => {
      paramsSearch[value] = key
    })

    return paramsSearch
  }, [searchParams])

  useEffect(() => {
    dispatch(fetchPacksTC(URLParam))
  }, [URLParam])

  return (
    <div>
      <PacksHeader />
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <HeadTablePacks columns={columns} packsCards={packsCards?.length} />
            <PacksTableBody packsCards={packsCards} />
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <PaginationTable pageCount={packCountState} totalCount={cardPacksTotal} page={pageState} />
      </div>
    </div>
  )
}
