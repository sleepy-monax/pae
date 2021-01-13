import { GetCookie, SetCookie, RemoveCookie } from "./CookiesService";
import { ApiAuthentication } from "./ApiService";

let authenticationToken = undefined;

export function connect(username, password, callback) {
  ApiAuthentication(username, password)
    .then((token) => {
      authenticationToken = token;
      SetCookie("authenticationToken", token);
      callback({ success: true, message: "" });
    })
    .catch((e) => {
      callback({ success: false, message: e });
    });
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
