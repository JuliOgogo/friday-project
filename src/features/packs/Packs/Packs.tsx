import React, { useEffect, useMemo } from 'react'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton, styled, tableCellClasses } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { PATH } from '../../../common/routes/pathRoutesList'
import { userId } from '../../auth/auth-selector'
import { DeleteModalIcon } from '../../modals/DeleteModal/DeleteModalIcon/DeleteModalIcon'
import { EditPackIcon } from '../../modals/PacksModal/EditPackIcon/EditPackIcon'
import { DomainPackType } from '../packs-api'
import { changeSortPacksAC, fetchPacksTC } from '../packs-reducer'
import { cardPacksTotalCount, packCount, packPage, packSelector, sortPacks } from '../packs-selector'
import { PacksHeader } from '../PacksHeader/PacksHeader'
import { PacksTableBody } from '../PacksTableBody/PacksTableBody'

import { isInitializedSelector } from 'app/app-selector'
import { useAppDispatch, useAppSelector } from 'app/store'
import { Column, EnhancedTableHead, Order } from 'common/components/EnhancedTableHead/EnhancedTableHead'
import { PaginationTable } from 'common/components/PaginationTable/PaginationTable'

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

  const handleClick = (id_pack: string) => {
    navigate(`/packs/${id_pack}`)
  }

  return (
    <div>
      <PacksHeader />
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: '60px' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="sticky table">
            <HeadTablePacks columns={columns} packsCards={packsCards?.length} />
            {/*<PacksTableBody packsCards={packsCards} />*/}
            <TableBody>
              {packsCards?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    <StyledTableCell
                      id={labelId}
                      scope="row"
                      onClick={() => handleClick(row._id)}
                      sx={{ cursor: 'pointer', wordWrap: 'break-word' }}
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.cardsCount}</StyledTableCell>
                    {/*/ new Date(updated).toLocaleDateString()*/}
                    <StyledTableCell align="left">{new Date(row.updated).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell align="left">{row.user_name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.user_id === userIdLogin ? (
                        <div>
                          <IconButton disabled={row.cardsCount === 0} href={`#${PATH.LEARN}`}>
                            <SchoolOutlinedIcon fontSize={'small'} />
                          </IconButton>
                          <EditPackIcon id_pack={row._id} packName={row.name} />
                          <DeleteModalIcon titleName={'Delete Pack'} id_pack={row._id} name={row.name} />
                        </div>
                      ) : (
                        <div>
                          <IconButton disabled={row.cardsCount === 0}>
                            <SchoolOutlinedIcon fontSize={'small'} />
                          </IconButton>
                        </div>
                      )}
                    </StyledTableCell>
                  </TableRow>
                )
              })}
            </TableBody>
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
