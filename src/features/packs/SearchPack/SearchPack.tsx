import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Search } from '../../../common/components/Search/Search'

export const SearchPack = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchPackName, setSearchPackName] = useState<string>()
  const searchParamPack = 'packName'

  useEffect(() => {
    if (searchParams.get('packName')) {
      const pageNameSearch = String(searchParams.get('packName'))

      setSearchPackName(pageNameSearch)
    }
  }, [])

  return <Search searchParamName={'packName'} />
}
