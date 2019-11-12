import React from 'react';
import Home from "./pages/home";
import Login from "./pages/login";
import Combat from "./components/Combat";
// import Map from "./components/map"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostCombat from './components/postCombat';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/combat" component={Combat} />
        <Route exact path="/results" component={PostCombat} />
      </Switch>
    </Router>
  )
}

export default App;
