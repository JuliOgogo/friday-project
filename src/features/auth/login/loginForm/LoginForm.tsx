import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../../common/components/CustomInput/CustomInput'
import { CustomInputPassword } from '../../../../common/components/CustomInputPassword/CustomInputPassword'
import { PATH } from '../../../../common/routes/pathRoutesList'
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
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address ⚠'
      }
      if (!values.password) {
        errors.password = 'Required field'
      } else if (values.password.length < 7) {
        errors.password = 'Password length must be longer 6 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: LoginDataType) => {
      dispatch(setLoginTC(values))
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <CustomInput
            label="Email"
            error={!!formik.errors.email && formik.touched.email}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <CustomInputPassword
            label="Password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <div className={style.checkbox}>
            <FormControlLabel
              label={<Typography className={style.checkboxRemember}>Remember me</Typography>}
              control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />}
            />
          </div>
          <div className={style.linkPassword}>
            <NavLink to={PATH.FORGOT_PASS}>Forgot password?</NavLink>
          </div>
          <CustomButton>Sign In</CustomButton>
        </FormGroup>
      </form>
      <div className={style.textRegister}>Dont have an account?</div>
      <div className={style.linkRegister}>
        <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
      </div>
    </>
  )
}

///----------- types -----------\\\
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
