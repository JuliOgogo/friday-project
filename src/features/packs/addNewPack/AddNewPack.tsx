import * as React from 'react'
import { useState } from 'react'

import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import { useAppDispatch } from '../../../app/store'
import { BackToPacksList } from '../../../common/components/BackToPacksList/BackToPacksList'
import style from '../../auth/login/Login.module.css'
import { createPackTC } from '../packs-reducer'

export function AddNewPack() {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('no name')
  const [checkValue, setCheckValue] = useState(false)

  const handleAddNewPack = () => {
    dispatch(createPackTC(value, checkValue))
    setValue('')
    setCheckValue(false)
  }

  return (
    <>
      <BackToPacksList />
      <Paper elevation={3} className={style.loginContainer}>
        <Typography variant="h4" className={style.title}>
          Add new pack
        </Typography>
        <FormGroup>
          <TextField
            id="standard-basic"
            label="Pack name"
            variant="standard"
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <FormControlLabel
            label={<Typography className={style.checkboxPrivate}>Private pack</Typography>}
            control={
              <Checkbox
                checked={checkValue}
                onChange={e => {
                  setCheckValue(e.target.checked)
                }}
              />
            }
          />
        </FormGroup>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={handleAddNewPack}
          sx={{
            width: '347px',
            borderRadius: '50px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '300',
            mt: '60px',
          }}
        >
          {' '}
          add new pack
        </Button>
      </Paper>
    </>
  )
}
