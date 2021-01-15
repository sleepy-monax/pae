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
        if (ue.bloc === bloc) {
            validated = validated && StudentHasValidatedUE(student, ue.ref);
        }
    }

    return validated;
}

export function StudentHasValdiatedEverythings(student) {}
