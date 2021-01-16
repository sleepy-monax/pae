import {GetCookie, SetCookie, RemoveCookie} from "./CookiesService";
import {ApiAuthentication, ApiIsAdmin} from "./ApiService";

let authenticationToken = undefined;
let admin = undefined;

export function connect(username, password, callback) {
    ApiAuthentication(username, password)
        .then((token) => {
            authenticationToken = token;
            SetCookie("authenticationToken", token);
            callback({success: true, message: ""});
        })
        .catch((e) => {
            callback({success: false, message: e});
        });
}

export function register(username, password, callback) {
    callback({success: true, message: ""});
}

export function disconnect() {
    authenticationToken = undefined;
    admin = undefined;
    RemoveCookie("authenticationToken");
    document.location.reload();
}

export function isConnected() {
    if (authenticationToken === undefined) {
        authenticationToken = GetCookie("authenticationToken");
    }

    return authenticationToken !== undefined;
}

export function getToken() {
    if (authenticationToken === undefined) {
        authenticationToken = GetCookie("authenticationToken");
    }

    return authenticationToken;
}

export function getEncodeToken() {
    if (authenticationToken === undefined) {
        authenticationToken = GetCookie("authenticationToken");
    }

    return encodeURIComponent(authenticationToken);
}

export function isAdmin(callback) {
    if (admin === undefined) {
        if (isConnected()) {
            ApiIsAdmin()
                .then(result => {
                    admin = result;
                    callback({success: result});
                })
        }
    }
    else {
        callback({success: admin});
    }

}
