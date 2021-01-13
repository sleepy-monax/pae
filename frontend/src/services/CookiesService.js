import Cookies from "js-cookie";

let allowed = undefined;

export function EnabledCookies() {
  if (allowed === undefined) {
    allowed = Cookies.getJSON("useCookies") ? true : false;
  }

  return allowed;
}

export function AllowCookies() {
  allowed = true;
  return Cookies.set("useCookies", true);
}

export function GetCookie(name) {
  if (allowed) {
    return Cookies.getJSON(name);
  } else {
    return undefined;
  }
}

export function SetCookie(name, value) {
  if (allowed) {
    Cookies.set(name, value);
  }
}

export function RemoveCookie(name) {
  Cookies.remove(name);
}
