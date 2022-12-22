import * as React from 'react'

import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { DomainPackType } from '../../../features/packs/packs-reducer'

export type Order = 'asc' | 'desc'

export interface Column {
  id: keyof DomainPackType
  label: string
  minWidth?: number
  align?: 'right'
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DomainPackType) => void
  order: Order
  orderBy: string
  rowCount: number
  columnsHead: Column[]
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, columnsHead } = props

  const createSortHandler = (property: keyof DomainPackType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {columnsHead.map(column => (
          <TableCell
            key={column.id}
            padding={'normal'}
            sortDirection={orderBy === column.id ? order : false}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
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
