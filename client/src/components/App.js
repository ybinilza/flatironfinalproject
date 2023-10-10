import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

function App() {
  return(<div>
    <h1>
      <LoginPage></LoginPage>
    </h1>
  </div>)
}

export default App;
