import React, { useEffect } from "react";

import "./App.css";
import { AppBar, Container } from "@material-ui/core";

import itIncubatorLogo from "../assets/images/itIncubatorLogo.svg";
import { Preloader } from "../common/components/preloader/Preloader";

import Pages from "./Pages/Pages";
import { useAppDispatch, useAppSelector } from "./store";
import { authMeTC } from "../features/auth/auth-reducer";

function App() {

  const dispatch = useAppDispatch();
  let isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    dispatch(authMeTC());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <AppBar position="static" color={"inherit"}>
        <div style={{ padding: "10px 100px" }}>
          <img alt={"logo"} src={itIncubatorLogo} />
        </div>
        {/*<div> здесь должна быть либо кнопка 'Sign In', либо значок профиля в зависимости от состояния нашего приложения </div>*/}
      </AppBar>

      <Container fixed style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Pages />
      </Container>
    </div>
  );
}

export default App;
