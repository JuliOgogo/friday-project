import * as React from 'react'

import Box from '@mui/material/Box'
import { visuallyHidden } from '@mui/utils'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { DomainPackType } from '../../../features/packs/packs-reducer'

export type Order = 'asc' | 'desc'

export interface ColumnPack {
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
  columnsHead: ColumnPack[]
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, columnsHead } = props

  const createSortHandler = (property: keyof DomainPackType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {columnsHead.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.align}
            style={{ minWidth: headCell.minWidth }}
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
