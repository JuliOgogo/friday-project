import React from "react";
import style  from './Registration.module.css'
import {Button, Link, TextField} from "@mui/material";

import {useFormik} from "formik";


type RegistrationPropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    confirm_password?: boolean
}
export function Registration () {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if(!values.password){
                errors.password= 'Required'
            }else if ( values.password.length < 3 ){
                errors.password = "bad Password"
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })

    return (
        <div className={style.container}>
        <div className={style.registration}>
            <h1 className={style.sing_up}>Sing up</h1>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                className={style.input_registration}
                required
                id="standard-required"
                label="Email"
                defaultValue=""
                variant="standard"
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}/>

            <br/>
            <TextField
                className={style.input_registration}
                required
                id="standard-required"
                label="Password"
                defaultValue=""
                variant="standard"
                type="password"
                {...formik.getFieldProps('password')}
                onBlur={formik.handleBlur}
            />
            <br/>
            <TextField
                className={style.input_registration}
                required
                id="standard-required"
                label="Confirm password"
                defaultValue=""
                variant="standard"
                type="password"
                {...formik.getFieldProps('confirm_password')}
                onBlur={formik.handleBlur}
            />
            <Button variant="contained"
                    className={style.button_sing_up}>Sing Up</Button>
            </form>
            <p className={style.already}> Already have an account?</p>
            <Link href="#">Link</Link>
        </div>
        </div>
    )
}