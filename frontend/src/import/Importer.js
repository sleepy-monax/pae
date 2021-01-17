import SectionView from "./SectionView";

export function ImportResult(sheet, student, sectionId) {
    let sectionView = new SectionView(sheet);

    let ues = [];

    for (const ue of sectionView.ues()) {
        let ueResult = {
            ref: ue.id(),
            bloc: sectionId + ue.bloc(),
            result:
                typeof ue.result(student.index()) === "number"
                    ? ue.result(student.index())
                    : 0,
            examen:
                typeof ue.result(student.index()) === "string"
                    ? ue.result(student.index())
                    : "",
            validated: ue.validate(student.index()) === "O",
            inPAE: false,
            aas: [],
        };

        for (const aa of ue.aas()) {
            ueResult.aas.push({
                ref: aa.id(),
                result:
                    typeof aa.result(student.index()) === "number"
                        ? aa.result(student.index())
                        : 0,
                examen:
                    typeof aa.result(student.index()) === "string"
                        ? aa.result(student.index())
                        : "",
                validated: aa.validated(student.index()),
                inPAE: false,
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
            paeDone: false,
        };

        student.ues = ImportResult(sheet, studentView, sectionId);

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
            sectionIDsToNames[sectionId] ??
            "Section indentifier par " + sectionId,
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
