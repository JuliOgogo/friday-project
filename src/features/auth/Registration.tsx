import React from "react";
import style  from './Registration.module.css'
import {Button, Link, TextField} from "@mui/material";
import {useFormik} from "formik";
import {Grid} from "@material-ui/core";
import {useAppDispatch} from "../../app/store";
import {RegistrationTC} from "./auth-reducer";


type FormikErrorType = {
    email?: string
    password?: string
    confirm_password?: string
}
export function Registration () {
    const dispatch = useAppDispatch()


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
            }else if ( values.password.length < 7 ){
                errors.password = "Password must be more than 7 characters..."
            }
            if(values.password !== values.confirm_password){
                errors.confirm_password = 'Passwords do not match.'
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            dispatch(RegistrationTC(values.email,values.password))
        },
    })

    return (
        <Grid container justifyContent={'center'} className={style.container}>
            <Grid item justifyContent={'center'} className={style.registration}>
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
                { formik.errors.email ? <div style={{color:'red'}}> {formik.errors.email}</div>: null}

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
                { formik.errors.password ? <div style={{color:'red'}}> {formik.errors.password}</div>: null}
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
                { formik.errors.confirm_password ? <div style={{color:'red'}}> {formik.errors.confirm_password}</div>: null}
                <br/>
            <Button variant="contained" type={'submit'}
                    className={style.button_sing_up}>Sing Up</Button>
            </form>
            <p className={style.already}> Already have an account?</p>
            <Link href="#">Link</Link>
            </Grid>
        </Grid>
    )
}