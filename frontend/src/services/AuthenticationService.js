import Cookies from 'js-cookie';

let authenticationToken = undefined;

export function connect(usename, password, callback) {
    authenticationToken = "q4sd65f4q6s5d4fq65sd4f";
    Cookies.set("authenticationToken", authenticationToken);

    callback({ success: true, message: "" });
}

export function disconnect() {
    authenticationToken = undefined;
}

export function isConnected() {
    if (authenticationToken === undefined) {
        authenticationToken = Cookies.get("authenticationToken");
    }

    return authenticationToken !== undefined;
}
