import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar"

function App() {
  return(<div>
    <h1>
      <Navbar></Navbar>
    </h1>
  </div>)
}

export default App;
