import * as React from 'react'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

interface Data {
  question: string
  answer: string
  updated: string
  grade: number
}
interface Data2 {
  name:string
  updated: string
  user_name: string
  cardsCount: number
  _id: string
}
interface Column {
  // id: 'name' | 'updated' | 'user_name' | 'cardsCount' | '_id'
  id: keyof Data2
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}
interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'question',
    numeric: false,
    disablePadding: true,
    label: 'Question',
  },
  {
    id: 'answer',
    numeric: true,
    disablePadding: false,
    label: 'Answer',
  },
  {
    id: 'updated',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'grade',
    numeric: true,
    disablePadding: false,
    label: 'Grade',
  },
]

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cardsCount', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'user_name',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: '_id',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
]




type Order = 'asc' | 'desc'




interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data2) => void
  order: Order
  orderBy: string
  rowCount: number

}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = (property: keyof Data2) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map(headCell => (
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
