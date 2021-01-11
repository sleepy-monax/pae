import Cookies from "js-cookie";

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
  Cookies.set("isDark", isDark);
  update();
}

export function isEnable() {
  if (isDark === undefined) {
    isDark = Cookies.getJSON("isDark");

    if (isDark === undefined) {
      isDark = false;
      Cookies.set("isDark", isDark);
    }
  }

  return isDark;
}
