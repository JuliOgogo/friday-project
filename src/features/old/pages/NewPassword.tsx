import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";

type NewPasswordRecoveryPropsType = {}

export const NewPassword: React.FC<NewPasswordRecoveryPropsType> = ({}) => {
    type FormikErrorType = {
        password?: string
    }
    const formik = useFormik
    ({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required field'
            } else if (values.password.length < 8) {
                errors.password = 'Invalid password length! It should be more then 7 symbols!'
            }

            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
            formik.resetForm()
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormGroup >
                <h3>Create new password</h3>

                <TextField type="password"
                           label="Password"
                           margin="normal"
                           {...formik.getFieldProps('password')}
                           onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password
                    ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                    : null}

                <p>Create new password and we will send you further instructions to email</p>

                <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Create new password
                </Button>
            </FormGroup>
        </form>
    )
}