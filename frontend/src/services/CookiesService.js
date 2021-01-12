import Cookies from "js-cookie";

export function Enabled() {
  return Cookies.getJSON("useCookies") ? true : false;
}

export function Allow() {
  return Cookies.set("useCookies", true);
}
