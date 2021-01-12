import { readFile } from "@ramonak/react-excel";

function ExtractStudents(worksheet) {}

function ExtractUEAndAA(worksheet) {}

function ExtractSection(worksheet) {}

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

  readFile(file)
    .then((spreadsheet) => {
      let data = {};

      console.log(spreadsheet);

      sucessCallback(data);
    })
    .catch((e) => {
      faillureCallback();
    });

  progressCallback(status);
}
