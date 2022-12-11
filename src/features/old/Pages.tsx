import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Login } from './pages/Login';
import {Registration} from "../auth/Registration";
import {Profile} from "./pages/Profile";
import Error404 from './pages/Error404'
import {PasswordRecovery} from "./pages/PasswordRecovery";
import {NewPassword} from "./pages/NewPassword";
import {TestStand} from "./pages/TestStand";

function Pages() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/test'}/>}/>

                <Route path={'/test'} element={<TestStand/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                <Route path={'/newPassword'} element={<NewPassword/>}/>

                <Route path={'/404'} element={<Error404/>}/>

                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    )
}

export default Pages
