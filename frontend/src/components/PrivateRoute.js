import { Redirect, Route } from "react-router-dom";
import { isConnected } from "../services/AuthenticationService";


export default function PrivateRoute({ component: Component, ...rest }) {
    return <Route {...rest} render={(props) => (
        isConnected() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
}