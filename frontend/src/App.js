import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Blocs from "./routes/Blocs";
import EditPae from "./routes/EditPae";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Importation from "./routes/Importation";
import Login from "./routes/Login";
import Students from "./routes/Students";

export default function App() {
  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <Switch>
          <Route path="/blocs">
            <Blocs />
          </Route>

          <Route path="/edit">
            <EditPae />
          </Route>

          <Route path="/import">
            <Importation />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/students">
            <Students />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            <Error />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
