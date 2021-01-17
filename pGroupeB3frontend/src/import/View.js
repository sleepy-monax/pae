let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function MakeCoords(x, y) {
  let coord = "";

  if (x > 25) {
    coord += letters[Math.floor(x / 26) - 1];
    coord += letters[x % 26];
  } else {
    coord += letters[x];
  }

  coord += y + 1;

  return coord;
}

export default class View {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
  }

  coords() {
    return MakeCoords(this.x, this.y);
  }

  valid() {
    let value = this.read(0, 0);

    if (value === undefined) {
      return false;
    }

    function trim(s) {
      return (s || "").replace(/^\s+|\s+$/g, "");
    }

    if (typeof value === "string") {
      return trim(value) !== "";
    }

    return true;
  }

  read(offx, offy) {
    let coords = MakeCoords(this.x + offx, this.y + offy);
    let cell = this.sheet[coords];
    let value = undefined;

    if (cell !== undefined) {
      value = cell.v;
    }

    return value;
  }
}
