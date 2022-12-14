import React from 'react'

import { Button, FormGroup, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/routes/pathRoutesList'
import { forgotTC } from '../auth-reducer'
import { forgotPasswordCheckSelector, forgotPasswordEmailSelector } from '../auth-selector'

import { CheckEmail } from './CheckEmail'
import style from './Password.module.css'

export const ForgotPassword: React.FC<PasswordRecoveryPropsType> = ({}) => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(forgotPasswordEmailSelector)
  const check = useAppSelector(forgotPasswordCheckSelector)

  type FormikErrorType = {
    email?: string
  }
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
      formik.resetForm()
      dispatch(forgotTC(values.email))
    },
  })

  if (check) {
    return <CheckEmail userEmail={email} />
  }

  return (
    <Paper elevation={3} className={style.container}>
      <Typography variant="h4" className={style.title}>
        Forgot your password?
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            {...formik.getFieldProps('email')}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={style.error}>{formik.errors.email}</div>
          ) : null}

          <p className={style.textMessage}>Enter your email address and we will send you further instructions</p>

          <Button
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            sx={{
              width: '347px',
              borderRadius: '50px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '300',
            }}
          >
            Send Instructions
          </Button>
          <p className={style.textBox}>Did you remember your password?</p>
          <NavLink to={`${PATH.LOGIN}`}>Try to logging in</NavLink>
        </FormGroup>
      </form>
    </Paper>
  )
}

// types
type PasswordRecoveryPropsType = {}
