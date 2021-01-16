import { BlocFindAA, BlocFindUE } from "./Bloc";

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
            if (ue.bloc <= student.bloc) {
                return ue.validated || ue.examen === "-" || ue.examen === "D";
            } else {
                return ue.validated || ue.examen === "D";
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

export function StudentValidatedCreditsUE(student, bloc, ue) {
    if (StudentHasValidatedUE(student, ue.ref)) {
        return BlocFindUE(bloc, ue.ref).credits;
    }

    let total = 0;

    for (const aa of ue.aas) {
        if (StudentHasValidatedAA(student, aa.ref)) {
            total += BlocFindAA(bloc, aa.ref).credits;
        }
    }

    return total;
}

export function StudentValidatedCreditsBloc(student, bloc) {
    let total = 0;

    for (const ue of student.ues) {
        if (ue.bloc === bloc.id) {
            total += StudentValidatedCreditsUE(student, bloc, ue);
        }
    }

    return total;
}

export function StudentPAECreditsUE(bloc, ue) {
    let total = 0;

    for (const aa of ue.aas) {
        if (aa.inPAE && !aa.validated) {
            total += BlocFindAA(bloc, aa.ref).credits;
        }
    }

    return total;
}

export function StudentPAECreditsBloc(student, bloc) {
    let total = 0;

    for (const ue of student.ues) {
        if (ue.bloc === bloc.id) {
            total += StudentPAECreditsUE(bloc, ue);
        }
    }

    return total;
}

export function StudentPAECredits(student, section) {
    let total = 0;

    for (const bloc of section.blocs) {
        total += StudentPAECreditsBloc(student, bloc);
    }

    return total;
}
