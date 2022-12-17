import React from 'react'

import { CircularProgress } from '@mui/material'

export const Preloader = () => {
  return (
    <div
      style={{ position: 'fixed', top: '45%', textAlign: 'center', width: '100%', height: '100vh' }}
    >
      <CircularProgress color={'primary'} />
    </div>
  )
}
