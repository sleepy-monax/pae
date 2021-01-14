import SectionView from "./SectionView";

export function ImportResult(sheet, student) {
  let sectionView = new SectionView(sheet);

  let ues = [];

  for (const ue of sectionView.ues()) {
    let ueResult = {
      id: ue.id(),
      result: ue.result(student.index()),
      validated: ue.validate(student.index()) === "O",
      aas: [],
    };

    for (const aa of ue.aas()) {
      ueResult.aas.push({
        id: aa.id(),
        result: aa.result(student.index()),
      });
    }

    ues.push(ueResult);
  }

  return ues;
}

export function ImportStudents(sheet, sectionId) {
  let sectionView = new SectionView(sheet);

  let students = [];

  for (const studentView of sectionView.students()) {
    let student = {
      id: studentView.id().toLowerCase(),
      index: studentView.index(),
      firstname: studentView.firstname(),
      lastname: studentView.lastname(),
      bloc: sectionId + studentView.bloc(),
    };

    student.ues = ImportResult(sheet, studentView);

    students.push(student);
  }

  return students;
}

export function ImportUEs(sheet, sectionId, blocNumber) {
  let sectionView = new SectionView(sheet);

  let ues = [];

  for (const ueView of sectionView.ues()) {
    if (ueView.bloc() === blocNumber) {
      let ue = {
        id: ueView.id(),
        credits: ueView.credits(),
        name: ueView.name(),
        optional: ueView.optional(),
        aas: [],
      };

      for (const aa of ueView.aas()) {
        ue.aas.push({
          id: aa.id(),
          name: aa.name(),
          credits: aa.credits(),
        });
      }

      ues.push(ue);
    }
  }

  return ues;
}

let sectionIDsToNames = {
  ig: "Informatique de gestion",
  ad: "Assistant·e de direction",
  ct: "Comptabilité",
};

export function ImportSection(sheet, sectionId) {
  let section = {
    id: sectionId,
    name:
      sectionIDsToNames[sectionId] ?? "Section indentifier par " + sectionId,
    blocs: [],
  };

  let blocIndex = 1;
  let ues = ImportUEs(sheet, sectionId, blocIndex);

  while (ues.length > 0) {
    section.blocs.push({
      id: sectionId + blocIndex,
      ues,
      name: "Bloc " + blocIndex,
    });

    blocIndex++;
    ues = ImportUEs(sheet, sectionId, blocIndex);
  }

  return section;
}
