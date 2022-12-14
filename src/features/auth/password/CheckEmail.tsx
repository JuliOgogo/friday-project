import React from "react";

import Button from "@mui/material/Button";

import eIcon from "../../../assets/images/check-icon.jpg";
import { login } from "../../../common/routes/pathRoutesList";

import style from "./Password.module.css";
import { Paper, Typography } from "@mui/material";

export const CheckEmail: React.FC<CheckEmailProps> = ({ userEmail }) => {
  return (
    <Paper elevation={3} className={style.container}>
      <Typography variant="h4" className={style.title}>
        Check Email
      </Typography>
      <div>
        <img className={style.image} src={eIcon} alt={"email"} />

        <p
          className={style.textBox}
        >{`We’ve sent an Email with instructions to ${userEmail}`}</p>

        <Button
          className={style.button}
          href={`#${login}`}
          variant={"contained"}
          color={"primary"}
        >
          Back to login
        </Button>
      </div>
    </Paper>
  );
};

// types
type CheckEmailProps = {
  userEmail: string;
};
