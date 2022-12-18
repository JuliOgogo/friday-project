import * as React from 'react';
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../app/store";
import {addNewPackTC} from "../packs-reducer";

export function AddNewPack() {
    const dispatch = useAppDispatch()
    const  handleAddNewPack=()=>{
        dispatch(addNewPackTC())
    }
    return(
        <Button  onClick={handleAddNewPack}
                 sx={{
                     width: '113px',
                     borderRadius: '50px',
                 }}> add New pack</Button>
    )
}