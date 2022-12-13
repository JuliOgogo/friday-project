import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";

export const PasswordRecovery: React.FC<PasswordRecoveryPropsType> = ({}) => {
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
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} >
            <FormGroup >
                <h3>Forgot your password?</h3>
                <TextField label="Email"
                           margin="normal"
                           {...formik.getFieldProps('email')}
                           onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email
                    ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                    : null}

                <p>Enter your email address and we will send you further instructions</p>

                <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Send Instructions
                </Button>

                <p>Did you remember your password?</p>
                <a href={'/login'}>Try to logging in</a>
            </FormGroup>
        </form>
    )
}

// types
type PasswordRecoveryPropsType = {}