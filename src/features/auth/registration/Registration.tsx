import React from 'react'

import { FormGroup, Paper, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { CustomInputPassword } from '../../../common/components/CustomInputPassword/CustomInputPassword'
import { PATH } from '../../../common/routes/pathRoutesList'
import { registrationTC } from '../auth-reducer'
import { registrationSelector } from '../auth-selector'

import style from './Registration.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  confirm_password?: string
}

export function Registration() {
  const dispatch = useAppDispatch()
  const id_registration = useAppSelector(registrationSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required field'
      } else if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
      ) {
        // !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
        errors.password = 'Password must be more than 7 characters...'
      }
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords do not match.'
      }

      return errors
    },
    onSubmit: values => {
      //alert(JSON.stringify(values));
      dispatch(registrationTC(values.email, values.password))
    },
  })

  if (id_registration) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Paper elevation={3} className={style.loginContainer}>
      <Typography variant="h4" className={style.title}>
        Sing Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <CustomInput
            error={!!formik.errors.email && formik.touched.email}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <CustomInputPassword
            label={'Password'}
            autoComplete={'new-password'}
            error={!!formik.errors.password && formik.touched.password}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />

          <CustomInputPassword
            label={'Confirm password'}
            autoComplete={'new-password'}
            error={!!formik.errors.confirm_password && formik.touched.confirm_password}
            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            {...formik.getFieldProps('confirm_password')}
          />

          <CustomButton>Sing Up</CustomButton>
          <p className={style.already}> Already have an account?</p>
          <NavLink to={PATH.LOGIN}>Sing In</NavLink>
        </FormGroup>
      </form>
    </Paper>
  )
}
