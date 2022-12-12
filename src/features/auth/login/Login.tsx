import React from "react";
import {LoginForm} from "./loginForm/LoginForm";
import {Paper, Typography} from "@mui/material";
import style from "./Login.module.css"

type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = ({}) => {
    return (
        <Paper elevation={3} className={style.loginContainer}>
            <Typography variant="h4" className={style.title}>
                Sing In
            </Typography>
            <LoginForm/>
        </Paper>
    )
}