import xlsx from "xlsx";

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function MakeCoords(x, y) {
  let coord = "";

  if (x > 25) {
    coord += letters[Math.floor(x / 25) - 1];
    coord += letters[x % 26];
  } else {
    coord += letters[x];
  }

  coord += y + 1;

  return coord;
}

class View {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
  }

  coords() {
    return MakeCoords(this.x, this.y);
  }

  exist() {
    return this.read(0, 0) !== undefined;
  }

  read(offx, offy) {
    let coords = MakeCoords(this.x + offx, this.y + offy);
    let cell = this.sheet[coords];
    let value = undefined;

    if (cell !== undefined) {
      value = cell.v;
    }

    console.log(`read(${coords}) => ${value}`);

    return value;
  }
}

class SectionView extends View {
  constructor(sheet) {
    super(sheet, 0, 0);
  }

  *students() {
    for (let i = 0; ; i++) {
      let student = new StudentView(this.sheet, i);

      if (!student.exist()) {
        break;
      }

      yield student;
    }
  }
}

class UEView extends View {
  constructor(sheet, x, y) {
    super(sheet, x, y);
  }

  credits() {
    return this.read(0, 1);
  }
}

class AAView extends View {
  constructor(sheet, x, y) {
    super(sheet, x, y);
  }
}

class StudentView extends View {
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
    return this.read(3, 0);
  }
}

function ReadFile(file, sucessCallback, errorCallback) {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  reader.onload = (e) => {
    const bstr = e.target.result;
    const wb = xlsx.read(bstr, { type: rABS ? "binary" : "array" });

    sucessCallback(wb);
  };

  reader.onerror = errorCallback;

  if (rABS) reader.readAsBinaryString(file);
  else reader.readAsArrayBuffer(file);
}

function ExtractStudents(worksheet) {}

function ExtractAA(worksheet, UE) {}

function ExtractUE(worksheet, section) {}

function ExtractSection(worksheet, sections) {}

function ExtractSections(spreadsheet) {
  let sections = [];

  spreadsheet.SheetNames.forEach((name) => {
    let sheet = spreadsheet.Sheets[name];

    let sectionView = new SectionView(sheet);

    console.log([...sectionView.students()]);

    console.log(sheet);
  });

  return sections;
}

export function Import(
  file,
  progressCallback,
  sucessCallback,
  faillureCallback
) {
  let status = {
    formatOk: undefined,
    structureOk: undefined,
    dataOk: undefined,
  };

  if (
    file.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    status.formatOk = false;
    progressCallback(status);
    faillureCallback();
    return;
  } else {
    status.formatOk = true;
  }

  ReadFile(
    file,
    (workbook) => {
      let data = {};
      console.log(workbook);
      let sections = ExtractSections(workbook);

      sucessCallback(data);
    },
    () => {
      faillureCallback();
    }
  );

  progressCallback(status);
}
