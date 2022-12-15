import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { routing } from "../../common/routes/pathRoutesList";
import { Login } from "../../features/auth/login/Login";
import { ForgotPassword } from "../../features/auth/password/ForgotPassword";
import { NewPassword } from "../../features/auth/password/NewPassword";
import { Registration } from "../../features/auth/registration/Registration";
import { Profile } from "../../features/profile/Profile";

function Pages() {
  return (
    <Routes>
      {/*<Route path={startPage} element={<Navigate to={login} />} />*/}
      <Route index path={routing.startPage} element={<h1>start</h1>} />
      <Route path={routing.registration} element={<Registration />} />
      <Route path={routing.login} element={<Login />} />
      <Route path={routing.profile} element={<Profile />} />
      <Route path={routing.forgotPassword} element={<ForgotPassword />} />
      <Route path={routing.newPassword} element={<NewPassword />} />
      <Route
        path={routing.page404}
        element={<h1 style={{ textAlign: "center" }}>404: PAGE NOT FOUND</h1>}
      />
      <Route
        path={routing.wrongPath}
        element={<Navigate to={routing.page404} />}
      />
    </Routes>
  );
}

export default Pages;
