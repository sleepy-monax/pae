export function StudentHasValidatedAA(student, aaId) {
    for (const ue of student.ues) {
        for (const aa of ue.aas) {
            if (aa.ref === aaId) {
                return aa.validated;
            }
        }
    }

    return false;
}

export function StudentHasValidatedUE(student, ueId) {
    for (const ue of student.ues) {
        if (ue.ref === ueId) {
            console.log(
                "ue.validated: " +
                    ue.validated +
                    " ue.examen: '" +
                    ue.examen +
                    "' ue.bloc < student.bloc: " +
                    (ue.bloc < student.bloc) +
                    " ue: " +
                    ue.bloc +
                    " stud: " +
                    student.bloc
            );

            if (ue.bloc < student.bloc) {
                return ue.validated || ue.examen === "-";
            } else {
                return ue.validated;
            }
        }
    }

    return false;
}

export function StudentHasValidatedBloc(student, bloc) {
    let validated = true;

    for (const ue of student.ues) {
        if (ue.bloc === bloc && !ue.validated && ue.examen != "-") {
            validated = false;
        }
    }

    return validated;
}
