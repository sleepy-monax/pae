import { GetCookie, SetCookie, RemoveCookie } from "./CookiesService";
import apiAuthentication from "./ApiService";

let authenticationToken = undefined;

export function connect(username, password, callback) {

  apiAuthentication(username, password).then(value => {
    SetCookie("authenticationToken", value.data);
    if (value.data !== null) {
      authenticationToken = value.data;
      callback({ success: true, message: "" });
    }
    else {
      callback({ success: false, message: "identifiant incorrect"})
    }
  }).catch(reason => callback({success: false, message: reason}));

}

export function register(username, password, callback) {
    callback({ success: true, message: "User registered" });
}

export function disconnect() {
  authenticationToken = undefined;
  RemoveCookie("authenticationToken");
  document.location.reload();
}

export function isConnected() {
  if (authenticationToken === undefined) {
    authenticationToken = GetCookie("authenticationToken");
  }

  return authenticationToken !== undefined;
}
