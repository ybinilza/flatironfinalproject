import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./SignupPage";

function App() {
  return(<div>
    <h1>
      <SignupPage></SignupPage>
    </h1>
  </div>)
}

export default App;
