import React from 'react'

import { Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import eIcon from '../../../assets/images/check-icon.jpg'
import { PATH } from '../../../common/routes/pathRoutesList'

import style from './Password.module.css'

export const CheckEmail: React.FC<CheckEmailProps> = ({ userEmail }) => {
  return (
    <Paper elevation={3} className={style.container}>
      <Typography variant="h4" className={style.title}>
        Check Email
      </Typography>
      <div>
        <img className={style.image} src={eIcon} alt={'email'} />

        <p className={style.textBox}>{`We’ve sent an Email with instructions to ${userEmail}`}</p>

        <Button
          href={`#${PATH.LOGIN}`}
          variant={'contained'}
          color={'primary'}
          sx={{
            width: '347px',
            borderRadius: '50px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '300',
          }}
        >
          Back to login
        </Button>
      </div>
    </Paper>
  )
}

// types
type CheckEmailProps = {
  userEmail: string
}
