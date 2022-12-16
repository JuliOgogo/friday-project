import React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

import { useAppDispatch } from "../../../../app/store";
import { routing } from "../../../../common/routes/pathRoutesList";
import { LoginDataType } from "../../auth-api";
import { setLoginTC } from "../../auth-reducer";

import style from "./LoginForm.module.css";

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values: LoginDataType) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = "Required field";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address ⚠";
      }
      if (!values.password) {
        errors.password = "Required field";
      } else if (values.password.length < 7) {
        errors.password = "Password length must be longer 6 symbols ⚠";
      }

      return errors;
    },
    onSubmit: (values: LoginDataType) => {
      dispatch(setLoginTC(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField
          label="Email"
          size={"small"}
          margin={"normal"}
          variant={"standard"}
          {...formik.getFieldProps("email")}
        />
        {formik.errors.email && (
          <div className={style.error}>
            {formik.touched.email && formik.errors.email}
          </div>
        )}
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
        <div className={style.checkbox}>
          <FormControlLabel
            label={"Remember me"}
            control={
              <Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps("rememberMe")}
              />
            }
          />
        </div>
        <div className={style.linkPassword}>
          <NavLink to={routing.forgotPassword}>Forgot password?</NavLink>
        </div>
      </FormGroup>
      <Button
        type={"submit"}
        variant={"contained"}
        color={"primary"}
        sx={{
          width: "347px",
          borderRadius: "50px",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "300",
        }}
      >
        Sign In
      </Button>
      <div className={style.textRegister}>Dont have an account?</div>
      <div className={style.linkRegister}>
        <NavLink to={routing.registration}>Sign Up</NavLink>
      </div>
    </form>
  );
};

///----------- types -----------\\\
type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
