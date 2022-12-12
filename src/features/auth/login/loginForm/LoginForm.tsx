import React from "react";
import style from "./LoginForm.module.css"
import {Form} from "formik";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";

export const LoginForm = () => {
    return (
        <form onSubmit={() => {
        }}>
            <FormGroup>
                <TextField
                    label="Email" size={"small"} margin={"normal"} variant={"standard"}
                />
                <TextField
                    label="Password" type={"password"} size={"small"} margin={"normal"} variant={"standard"}/>
                <div className={style.checkbox}>
                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox name={"rememberMe"} onChange={() => {
                                      }}/>}/>
                </div>
                <div className={style.linkPassword}>
                    <NavLink to={"/passwordRecovery"}>Forgot password?</NavLink>
                </div>
                <Button variant="contained" sx={{
                    borderRadius: "50px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "300"
                }}>Sign In</Button>

                <div className={style.textRegister}>Dont have an account?</div>

                <div className={style.linkRegister}>
                    <NavLink to={"/registration"}>Sign Up</NavLink>
                </div>
            </FormGroup>
        </form>
    );
};
