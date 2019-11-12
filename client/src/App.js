import React from 'react';
import Home from "./pages/home";
import Login from "./pages/login";
import Combat from "./components/Combat";
import Welcome from "./components/Welcome";
import Inventory from "./pages/inventory";
// import Map from "./components/map"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/combat" component={Combat} />
        {/* dynamic url */}
        <Route path="/home/:id" component={Home} />
        <Route path="/inventory/:id" component={Inventory} />
      </Switch>
    </Router>
  )
}

export default App;
