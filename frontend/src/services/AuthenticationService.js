import { GetCookie, SetCookie, RemoveCookie } from "./CookiesService";

let authenticationToken = undefined;

export function connect(username, password, callback) {
  authenticationToken = "q4sd65f4q6s5d4fq65sd4f";
  SetCookie("authenticationToken", authenticationToken);

  callback({ success: true, message: "" });
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
