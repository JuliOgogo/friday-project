import React from "react";

import { Button, FormGroup, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { routing } from "../../../common/routes/pathRoutesList";
import { newPasswordTC } from "../auth-reducer";

import style from "./Password.module.css";

export const NewPassword: React.FC<NewPasswordRecoveryPropsType> = ({}) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.app.status);

  const { resetToken } = useParams<{ resetToken: string }>();

  type FormikErrorType = {
    password?: string;
  };
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.password) {
        errors.password = "Required field";
      } else if (values.password.length < 8) {
        errors.password =
          "Invalid password length! Password must be more than 7 characters...";
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      formik.resetForm();
      resetToken && dispatch(newPasswordTC(values.password, resetToken));
    },
  });

  if (status === "succeeded") {
    return <Navigate to={routing.login} />;
  }

  return (
    <Paper elevation={3} className={style.container}>
      <Typography variant="h4" className={style.title}>
        Create new password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <TextField
            type="password"
            label="Password"
            margin="normal"
            variant="standard"
            {...formik.getFieldProps("password")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={style.error}>{formik.errors.password}</div>
          ) : null}

          <p className={style.textMessage}>
            Create new password and we will send you further instructions to
            email
          </p>

          <Button
            className={style.button}
            type={"submit"}
            variant={"contained"}
            color={"primary"}
          >
            Create new password
          </Button>
        </FormGroup>
      </form>
    </Paper>
  );
};

// types
type NewPasswordRecoveryPropsType = {};
