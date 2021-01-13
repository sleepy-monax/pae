import xlsx from "xlsx";
import { ImportSection, ImportStudents } from "../import/Importer";

function ExtractAllStudents(workbook) {
  let students = [];

  workbook.SheetNames.forEach((section) => {
    let sheet = workbook.Sheets[section];

    students = [...students, ...ImportStudents(sheet, section.toLowerCase())];
  });

  return students;
}

function ExtractAllSection(workbook) {
  let sections = [];

  workbook.SheetNames.forEach((section) => {
    let sheet = workbook.Sheets[section];

    sections.push(ImportSection(sheet, section.toLowerCase()));
  });

  return sections;
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

      console.log(" ------ Students ------");
      let students = ExtractAllStudents(workbook);
      console.log(students);

      console.log(" ------ Sections ------");
      let sections = ExtractAllSection(workbook);
      console.log(sections);

      sucessCallback(data);
    },
    () => {
      faillureCallback();
    }
  );

  progressCallback(status);
}
