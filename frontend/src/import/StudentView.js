import View from "./View";

export default class StudentView extends View {
  constructor(sheet, index) {
    super(sheet, 0, 3 + index);
  }

  index() {
    return this.read(0, 0);
  }

  firstname() {
    return this.read(1, 0).split(" ")[1];
  }

  lastname() {
    return this.read(1, 0).split(" ")[0];
  }

  id() {
    return this.read(2, 0);
  }

  bloc() {
    return this.read(3, 0)[0];
  }
}
