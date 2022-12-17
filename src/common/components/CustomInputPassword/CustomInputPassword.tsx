import {FormControl, IconButton,  InputAdornment, TextFieldProps} from "@mui/material";
import React from 'react';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {CustomInput} from "../CustomInput/CustomInput";

type CustomInputPasswordPropsType = TextFieldProps & {
    value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomInputPassword: React.FC<CustomInputPasswordPropsType> = ({
                                                                ...props
                                                            }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="standard">

            <CustomInput
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: ( <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>),
                }}
                {...props}
            />

        </FormControl>
    )
}