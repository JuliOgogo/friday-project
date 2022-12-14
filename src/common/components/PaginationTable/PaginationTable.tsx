import React, { useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'
import { useSearchParams } from 'react-router-dom'

interface PaginationTable {
  pageCount: number
  totalCount: number
  page: number
}

// eslint-disable-next-line no-redeclare
export function PaginationTable(props: PaginationTable) {
  const [rowPerPageState, setRowPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(1)
  const totalCount = props.totalCount

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePage = (event: unknown, page: number) => {
    const newPage = page + 1

    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('pageCount', event.target.value.toString())
    setSearchParams(searchParams)
    setRowPerPage(+event.target.value)
  }

  useEffect(() => {
    if (searchParams.get('page')) {
      const pageParams = Number(searchParams.get('page'))

      setPage(pageParams)
    }
    if (searchParams.get('pageCount')) {
      const pageCountParam = Number(searchParams.get('pageCount'))

      setRowPerPage(pageCountParam)
    }
  }, [searchParams])

  return (
    <TablePagination
      count={totalCount || 0}
      component="div"
      rowsPerPage={rowPerPageState}
      page={page ? page - 1 : 0}
      rowsPerPageOptions={[4, 5, 10, 25]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        fontFamily: 'Montserrat',
      }}
    />
  )
}
