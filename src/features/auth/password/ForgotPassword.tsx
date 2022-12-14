import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import { forgotTC } from "../auth-reducer";
import {CheckEmail} from "./CheckEmail";
import style from "./Password.module.css";
import { login } from "../../../common/routes/pathRoutesList";

export const ForgotPassword: React.FC<PasswordRecoveryPropsType> = ({}) => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.auth.email)
    const check = useAppSelector(state => state.auth.check)

    type FormikErrorType = {
        email?: string
    }
    const formik = useFormik
    ({
        initialValues: {
            email: '',
        },
        validate: (values) => {
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
        <form onSubmit={formik.handleSubmit} className={style.container}>
            <FormGroup className={style.password}>
                <h3>Forgot your password?</h3>
                <TextField label="Email"
                           margin="normal"
                           variant="standard"
                           {...formik.getFieldProps('email')}
                           onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email
                    ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                    : null}

                <p className={style.textBox}>Enter your email address and we will send you further instructions</p>

                <Button className={style.button} type={'submit'} variant={'contained'} color={'primary'}>
                    Send Instructions
                </Button>
                <p className={style.textBox}>Did you remember your password?</p>
                <a href={`#${login}`}>Try to logging in</a>
            </FormGroup>
        </form>
    )
}

// types
type PasswordRecoveryPropsType = {}