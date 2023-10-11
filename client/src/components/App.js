import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar"
import ItemList from "./ItemList";
import Item from "./Item";
import NewItemAdd from "./NewItemAdd"
import EachPersonPage from "./EachPersonPage";

function App() {
/*
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

*/
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
            <Item/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  </div> 
  );
}


export default App;
