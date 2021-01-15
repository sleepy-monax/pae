import xlsx from "xlsx";
import { ImportSection, ImportStudents } from "../import/Importer";
import { ApiUploadStudents } from "./ApiService";
import { SendAllSections } from "./SectionService";

function ExtractAllStudents(workbook) {
    let students = [];

    workbook.SheetNames.forEach((section) => {
        let sheet = workbook.Sheets[section];

        students = [
            ...students,
            ...ImportStudents(sheet, section.toLowerCase()),
        ];
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
        importOk: undefined,
        uploadOk: undefined,
    };

    if (
        !file.name.endsWith(".xlsx") &&
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

    progressCallback(status);

    ReadFile(
        file,
        (workbook) => {
            let data = {};

            let students = ExtractAllStudents(workbook);
            let sections = ExtractAllSection(workbook);

            status.importOk = true;
            progressCallback(status);

            Promise.all([
                SendAllSections(sections),
                ApiUploadStudents(students),
            ])
                .then(() => {
                    status.uploadOk = true;
                    progressCallback(status);

                    sucessCallback(data);
                })
                .catch(() => {
                    status.uploadOk = false;
                    progressCallback(status);

                    faillureCallback();
                });
        },
        () => {
            faillureCallback();
        }
    );

    progressCallback(status);
}
