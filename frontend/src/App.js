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
import Register from "./routes/Register";
import { update } from "./services/DarkModeService";
import About from "./routes/About";
import CookiesHeader from "./components/CookiesHeader";
import Admin from "./routes/Admin";
import User from "./routes/User";

export default function App() {
    update();

    return (
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
            <div className="flex flex-col h-screen">
                <NavBar />
                <CookiesHeader />

                <div className="flex flex-1 flex-col overflow-y-scroll">
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>

                        <PrivateRoute path="/admin" component={Admin} />
                        <PrivateRoute path="/register" component={Register} />
                        <PrivateRoute path="/user/:userId" component={User} />
                        <PrivateRoute path="/bloc/:blocId" component={Bloc} />
                        <PrivateRoute
                            path="/student/:studentId"
                            component={Edit}
                        />
                        <PrivateRoute path="/import" component={Importation} />
                        <PrivateRoute path="/" exact component={Home} />

                        <PrivateRoute component={Error} />
                    </Switch>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}
