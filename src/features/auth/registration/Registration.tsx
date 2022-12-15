/* eslint-disable */
import React from 'react'

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
} from "@mui/material";
import { useFormik } from "formik";
import { Navigate, NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/store";

import { registrationTC } from "../auth-reducer";
import style from "./Registration.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { routing } from "../../../common/routes/pathRoutesList";

type FormikErrorType = {
  email?: string
  password?: string
  confirm_password?: string
}

export function Registration() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowConfirmPassword = () =>
      setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();
  const id_registration = useAppSelector((state) => state.auth.isRegistration);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = "Required";
      } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
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
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      dispatch(registrationTC(values.email, values.password));
    },
  })

  if (id_registration) {
    return <Navigate to={routing.login} />;
  }

  return (
      <Paper elevation={4} className={style.loginContainer}>
        <Typography variant="h4" className={style.title}>
          Sing up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
                required
                id="standard-required"
                margin="normal"
                label="Email"
                variant="standard"
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email ? (
                <div className={style.error}> {formik.errors.email}</div>
            ) : null}

            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                  {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                  <div className={style.error}>{formik.errors.password}</div>
              )}
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                {" "}
                Confirm Password
              </InputLabel>
              <Input
                  id="standard-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
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
                  {...formik.getFieldProps("confirm_password")}
              />
              {formik.touched.confirm_password &&
                  formik.errors.confirm_password && (
                      <div className={style.error}>
                        {formik.errors.confirm_password}
                      </div>
                  )}
            </FormControl>

            <Button
                variant="contained"
                type={"submit"}
                className={style.buttonSubmit}
            >
              Sing Up
            </Button>
            <p className={style.already}> Already have an account?</p>
            <NavLink to={routing.login}>Sing In</NavLink>
          </FormGroup>
        </form>
      </Paper>
  );
}
