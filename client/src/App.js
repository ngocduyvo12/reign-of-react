import React from 'react';
import Home from "./pages/home";
import Login from "./pages/login"
// import Map from "./components/map"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home/:id" component={Home} />
      </Switch>
    </Router>
  )
}


export default App;
