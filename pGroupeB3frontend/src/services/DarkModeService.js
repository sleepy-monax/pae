import { GetCookie, SetCookie } from "./CookiesService";

let isDark = undefined;

export function update() {
  if (isEnable()) {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }
}

export function toggle() {
  isDark = !isEnable();

  SetCookie("isDark", isDark);
  update();
}

export function isEnable() {
  if (isDark === undefined) {
    isDark = GetCookie("isDark");

    if (isDark === undefined) {
      isDark = false;
      SetCookie("isDark", isDark);
    }
  }

  return isDark;
}
