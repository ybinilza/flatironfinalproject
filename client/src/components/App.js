import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar"
import ItemList from "./ItemList";

function App() {
  return(<div>
    <h1>
      <ItemList> </ItemList>
    </h1>
  </div>)
}


export default App;
