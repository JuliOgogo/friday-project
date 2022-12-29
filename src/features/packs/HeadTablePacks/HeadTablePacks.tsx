import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Column, EnhancedTableHead, Order } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import { DomainPackType } from '../packs-api'

type HeadTablePacksType = {
  columns: Column[]
  packsCards: number
}
export const HeadTablePacks = (props: HeadTablePacksType) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof DomainPackType | ''>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DomainPackType) => {
    if (property === 'user_id') {
      return
    }
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortPacks', (isAsc ? 0 : 1) + property)
    setSearchParams(searchParams)

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    let orderParam = searchParams.get('sortPacks')

    if (orderParam) {
      setOrderBy(orderParam.substring(1) as keyof DomainPackType)
      setOrder(Number(orderParam.at(0)) ? 'asc' : 'desc')
    }
  }, [])

  return (
    <EnhancedTableHead
      columnsHead={props.columns}
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy.toString()}
      rowCount={props.packsCards}
    />
  )
}
