import StudentView from "./StudentView";
import UEView from "./UEView";
import View from "./View";

export default class SectionView extends View {
  constructor(sheet) {
    super(sheet, 0, 0);
  }

  *students() {
    for (let i = 0; ; i++) {
      let student = new StudentView(this.sheet, i);

      if (!student.valid()) {
        break;
      }

      yield student;
    }
  }

  *ues() {
    let ue = new UEView(this.sheet, 0);

    while (ue.valid()) {
      yield ue;
      ue = ue.next();
    }
  }

  *blocs() {}
}
