export function SectionFindUE(section, id) {
    for (const bloc of section.blocs) {
        for (const ue of bloc.ues) {
            if (ue.id === id) {
                return ue;
            }
        }
    }

    return undefined;
}

export function SectionFindAA(section, id) {
    for (const bloc of section.blocs) {
        for (const ue of bloc.ues) {
            for (const aa of ue.aas) {
                if (aa.id === id) {
                    return aa;
                }
            }
        }
    }

    return undefined;
}
