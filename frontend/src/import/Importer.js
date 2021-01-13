import SectionView from "./SectionView";

export function ImportResult(sheet, student) {
  let sectionView = new SectionView(sheet);

  let ues = [];

  for (const ue of sectionView.ues()) {
    let ueResult = {
      id: ue.id(),
      result: ue.result(student.index()),
      validated: ue.validate(student.index()),

      aas: [],
    };

    for (const aa of ue.aas()) {
      ueResult.aas.push({
        id: aa.id(),
        result: aa.result(student.index()),
      });

      aa.result(student.index());
    }

    ues.push(ueResult);
  }

  return ues;
}

export function ImportStudents(sheet, section) {
  let sectionView = new SectionView(sheet);

  let students = [];

  for (const studentView of sectionView.students()) {
    let student = {
      id: studentView.id(),
      index: studentView.index(),
      firstname: studentView.firstname(),
      lastname: studentView.lastname(),
      bloc: section + studentView.bloc(),
    };

    student.ues = ImportResult(sheet, studentView);

    students.push(student);
  }

  return students;
}

export function ImportUE(view, section) {}

export function ImportBloc(view, sectionId) {}

export function ImportSection(sheet, sectionId) {
  let sectionView = new SectionView(sheet);

  let section = {
    id: sectionId,
    ues: [],
  };

  return section;
}
