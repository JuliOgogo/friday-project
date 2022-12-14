import React from 'react'

import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import { forgotPassword } from '../../../../common/routes/pathRoutesList'
import { LoginDataType } from '../../auth-api'
import { setLoginTC } from '../../auth-reducer'

import style from './LoginForm.module.css'

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values: LoginDataType) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address ⚠'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 6) {
        errors.password = 'Password length must be longer 6 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: LoginDataType) => {
      dispatch(setLoginTC(values))
      formik.resetForm()
    },
  })
  //console.log(formik.values)
  //console.log(formik.errors)

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField
          label="Email"
          size={'small'}
          margin={'normal'}
          variant={'standard'}
          {...formik.getFieldProps('email')}
        />
        {formik.errors.email && (
          <div className={style.error}>{formik.touched.email && formik.errors.email}</div>
        )}
        <TextField
          label="Password"
          type={'password'}
          size={'small'}
          margin={'normal'}
          variant={'standard'}
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <div className={style.error}>{formik.errors.password}</div>
        )}
        <div className={style.checkbox}>
          <FormControlLabel
            label={'Remember me'}
            control={
              <Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />
            }
          />
        </div>
        <div className={style.linkPassword}>
          <NavLink to={forgotPassword}>Forgot password?</NavLink>
        </div>
        <Button
          type={'submit'}
          variant="contained"
          sx={{
            borderRadius: '50px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '300',
          }}
        >
          Sign In
        </Button>
        <div className={style.textRegister}>Dont have an account?</div>
        <div className={style.linkRegister}>
          <NavLink to={'/registration'}>Sign Up</NavLink>
        </div>
      </FormGroup>
    </form>
  )
}

///----------- types -----------\\\
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
