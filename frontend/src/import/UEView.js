import AAView from "./AAView";
import View from "./View";

export default class UEView extends View {
  constructor(sheet, index) {
    super(sheet, 4 + index, 0);

    this.index = index;
  }

  id() {
    return this.read(0, 0).split(" : ")[0];
  }

  name() {
    return this.read(0, 0).split(" : ")[1];
  }

  valid() {
    return super.valid() && this.read(0, 1).startsWith("UE");
  }

  credits() {
    return this.read(0, 1);
  }

  aasByIndex(index) {
    return new AAView(this.sheet, this.index + 2 + index);
  }

  *aas() {
    for (let i = 0; ; i++) {
      let aa = this.aasByIndex(i);

      if (!aa.valid()) {
        break;
      }


      yield aa;
    }
  }

  aasCount() {
    for (let i = 0; i < 99; i++) {
      let aa = this.aasByIndex(i);

      if (!aa.valid()) {
        return i;
      }
    }
  }

  next() {
    return new UEView(this.sheet, this.index + 2 + this.aasCount());
  }

  result(studentIndex) {
    return this.read(0, 3 + studentIndex);
  }

  validate(studentIndex) {
    return this.read(1, 3 + studentIndex);
  }
}
