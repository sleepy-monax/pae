import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
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
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/blocs" component={Blocs} />
          <PrivateRoute path="/edit/:studentId" component={EditPae} />
          <PrivateRoute path="/import" component={Importation} />
          <PrivateRoute path="/students" component={Students} />
          <PrivateRoute path="/" exact component={Home} />

          <Route>
            <Error />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
