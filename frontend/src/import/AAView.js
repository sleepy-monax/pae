import View from "./View";

export default class AAView extends View {
  constructor(sheet, index) {
    super(sheet, 4 + index, 0);
  }

  valid() {
    return (
      super.valid() &&
      (this.read(0, 1) === "AcAp" || this.read(0, 1) === "EpIn")
    );
  }

  id() {
    return this.read(0, 0).split(" : ")[0];
  }

  name() {
    return this.read(0, 0).split(" : ")[1];
  }

  result(studentIndex) {
    return this.read(0, 3 + studentIndex);
  }

  credits() {
    return this.read(0, 2);
  }
}
