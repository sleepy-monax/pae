export function BlocFindUE(bloc, id) {
    for (const ue of bloc.ues) {
        if (ue.id === id) {
            return ue;
        }
    }

    return undefined;
}

export function BlocFindAA(bloc, id) {
    for (const ue of bloc.ues) {
        for (const aa of ue.aas) {
            if (aa.id === id) {
                return aa;
            }
        }
    }

    return undefined;
}
