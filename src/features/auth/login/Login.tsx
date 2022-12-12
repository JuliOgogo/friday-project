import React from "react";
import {LoginForm} from "./loginForm/LoginForm";
import {Paper, Typography} from "@mui/material";
import style from "./Login.module.css";
import {useAppSelector} from "../../../app/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) return <Navigate to={"/profile"}/>;
    return (
        <Paper elevation={3} className={style.loginContainer}>
            <Typography variant="h4" className={style.title}>
                Sing In
            </Typography>
            <LoginForm/>
        </Paper>
    );
};
