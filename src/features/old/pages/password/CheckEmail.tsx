import React from 'react';
import Button from "@mui/material/Button";
import style from "./Password.module.css";
import eIcon from "../../../assets/images/check-icon.jpg";

export const CheckEmail: React.FC<CheckEmailProps> = ({userEmail, ...restProps}) => {

    return (
        <div className={style.container}>
            <div className={style.password}>
                <h3>Check Email</h3>

                <img className={style.image} src={eIcon} alt={'email'}/>

                <p className={style.textBox}>{`We’ve sent an Email with instructions to ${userEmail}`}</p>

                <Button className={style.button} href={'/login'} variant={'contained'} color={'primary'}>Back to login</Button>

            </div>
        </div>
    );
};

// types
type CheckEmailProps = {
    userEmail: string
}