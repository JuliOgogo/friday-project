import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
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
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
          <TextField
            size={'small'}
            margin={'normal'}
            label="Email"
            variant="standard"
            {...formik.getFieldProps('email')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email ? <div className={style.error}> {formik.errors.email}</div> : null}

          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={style.error}>{formik.errors.password}</div>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password"> Confirm Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...formik.getFieldProps('confirm_password')}
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <div className={style.error}>{formik.errors.confirm_password}</div>
            )}
          </FormControl>

          <Button
            variant="contained"
            type={'submit'}
            color={'primary'}
            sx={{
              width: '347px',
              borderRadius: '50px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '300',
              mt: '60px',
            }}
          >
            Sing Up
          </Button>
          <p className={style.already}> Already have an account?</p>
          <NavLink to={PATH.LOGIN}>Sing In</NavLink>
        </FormGroup>
      </form>
    </Paper>
  )
}
