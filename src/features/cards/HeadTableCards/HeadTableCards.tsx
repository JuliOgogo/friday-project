import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Column, EnhancedTableHead, Order } from '../../../common/components/EnhancedTableHead/EnhancedTableHead'
import { CardStateType } from '../cards-reducer'

type HeadTableCardsType = {
  columns: Column[]
  packsCards: number
}
export const HeadTableCards = (props: HeadTableCardsType) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof CardStateType | ''>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CardStateType) => {
    const isAsc = orderBy === property && order === 'asc'

    searchParams.set('sortCards', (isAsc ? 0 : 1) + property)
    setSearchParams(searchParams)

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    let orderParam = searchParams.get('sortCards')

    if (orderParam) {
      setOrderBy(orderParam.substring(1) as keyof CardStateType)
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
