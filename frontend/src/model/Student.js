export function StudentHasValidatedUE(student, ueId) {
    for (const ue of student.ues) {
        if (ue.ref === ueId) {
            return ue.validated;
        }
    }

    return false;
}

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

export function StudentHasValidatedBloc(student, block) {
    for (const block of student) {
    }
}
