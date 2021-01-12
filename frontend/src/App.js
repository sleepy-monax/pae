import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Bloc from "./routes/Bloc";
import Edit from "./routes/Edit";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Importation from "./routes/Importation";
import Login from "./routes/Login";
import { update } from "./services/DarkModeService";
import About from "./routes/About";
import CookiesHeader from "./components/CookiesHeader";

export default function App() {
  update();

  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <CookiesHeader />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>

          <PrivateRoute path="/bloc/:blockId" component={Bloc} />
          <PrivateRoute path="/edit/:studentId" component={Edit} />
          <PrivateRoute path="/import" component={Importation} />
          <PrivateRoute path="/" exact component={Home} />

          <PrivateRoute component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
