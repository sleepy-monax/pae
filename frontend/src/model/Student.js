export function StudentHasValidatedUE(student, ueId) {
    console.log(student);
    for (const ue of student.ues) {
        if (ue.ref === ueId) {
            return ue.validated;
        }
    }

    return false;
}

export function StudentHasValidatedBloc(student, block) {
    for (const block of student) {
    }
}
