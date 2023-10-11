import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar"
import ItemList from "./ItemList";

function App() {
  return (
   <div>
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <ItemList />
          </Route>
        </Switch>
      </div>
    </Router>
    
  </div> 
  );
}


export default App;
