/* eslint-disable */
import React from 'react'

import { Button, Link, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { registrationTC } from './auth-reducer'
import style from './Registration.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  confirm_password?: string
}

export function Registration() {
  const dispatch = useAppDispatch()
  const id_registration = useAppSelector(state => state.auth.isRegistration)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters...'
      }
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords do not match.'
      }

      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
      dispatch(registrationTC(values.email, values.password))
    },
  })

  if (id_registration) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={style.container}>
      <div className={style.registration}>
        <form onSubmit={formik.handleSubmit}>
          <div className={style.from_registration}>
            <h1>Sing up</h1>
            <TextField
              className={style.input_registration}
              required
              id="standard-required"
              margin="normal"
              label="Email"
              variant="standard"
              {...formik.getFieldProps('email')}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? (
              <div style={{ color: 'red' }}> {formik.errors.email}</div>
            ) : null}

            <TextField
              className={style.input_registration}
              id="standard-required"
              label="Password"
              variant="standard"
              type="password"
              {...formik.getFieldProps('password')}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div style={{ color: 'red' }}> {formik.errors.password}</div>
            ) : null}

            <TextField
              className={style.input_registration}
              required
              id="standard-required"
              margin="normal"
              label="Confirm password"
              variant="standard"
              type="password"
              {...formik.getFieldProps('confirm_password')}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirm_password ? (
              <div style={{ color: 'red' }}> {formik.errors.confirm_password}</div>
            ) : null}

            <Button className={style.button_sing_up} variant="contained" type={'submit'}>
              Sing Up
            </Button>
            <p className={style.already}> Already have an account?</p>
            <Link href="#">Link</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
