import {
    mdiCheckAll,
    mdiCheckboxBlankOutline,
    mdiCheckboxMarked,
    mdiCheckCircle,
    mdiCheckCircleOutline,
    mdiEmail,
    mdiFormatListChecks,
    mdiPrinter,
    mdiTrophy,
    mdiUnfoldLessHorizontal,
    mdiUnfoldMoreHorizontal,
} from "@mdi/js";

import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Icon from "@mdi/react";

import { FindSectionFromBlocId } from "../services/SectionService";
import {
    FindStudentById,
    GetBlocForStudent,
    UpdateStudent,
} from "../services/StudentsService";
import { OutlineBlue, OutlineWhite } from "../components/Styles";
import LinkButton from "../components/LinkButton";
import DetailButton from "../components/DetailButton";
import Header from "../components/Hearder";
import Loading from "../components/Loading";

import {
    StudentHasValidatedAA,
    StudentHasValidatedBloc,
    StudentHasValidatedUE,
    StudentPAECredits,
    StudentPAECreditsBloc,
    StudentValidatedCreditsBloc,
} from "../model/Student";
import { SectionFindAA, SectionFindUE } from "../model/Section";
import Button from "../components/Button";

function Checkbox(props) {
    return (
        <Icon
            className="text-helha_blue cursor-pointer select-none"
            path={props.checked ? mdiCheckboxMarked : mdiCheckboxBlankOutline}
            size={1}
            onClick={() => {
                props.onChange(!props.checked);
            }}
        />
    );
}

function AA(props) {
    let aaInfos = SectionFindAA(props.section, props.aaId);

    let icon = undefined;

    if (StudentHasValidatedAA(props.student, props.aaId)) {
        icon = (
            <Icon
                className="text-helha_grey dark:text-white"
                path={mdiCheckCircle}
                size={1}
            />
        );
    } else if (StudentHasValidatedUE(props.student, props.ueId)) {
        icon = (
            <Icon
                className="text-helha_grey dark:text-white"
                path={mdiCheckCircleOutline}
                size={1}
            />
        );
    } else {
        icon = (
            <Checkbox
                checked={props.aa.inPAE}
                onChange={(value) => {
                    let aaCopy = props.aa;
                    aaCopy.inPAE = value;

                    props.onChange(aaCopy);
                }}
            />
        );
    }

    return (
        <div className="gap-4 flex items-center">
            <div className="flex-1">{aaInfos.name}</div>
            {icon}
        </div>
    );
}

function UE(props) {
    let ue = props.ue;
    let ueInfos = SectionFindUE(props.section, ue.ref);

    const [expended, setExpended] = useState(false);
    const [aas, setAAS] = useState(props.ue.aas);

    let expender = (
        <Icon
            path={expended ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal}
            size={1}
        />
    );

    let aasList;

    if (expended) {
        aasList = ue.aas.map((aa, index) => (
            <AA
                key={index}
                aa={aa}
                student={props.student}
                section={props.section}
                ueId={ue.ref}
                aaId={aa.ref}
                aaName={aa.name}
                onChange={(aa) => {
                    let aasCopy = [...aas];

                    for (let i = 0; i < aasCopy.length; i++) {
                        if (aasCopy[i].ref === ue.ref) {
                            aasCopy[i] = ue;
                        }
                    }

                    let copyUE = props.ue;
                    copyUE.aas = aasCopy;
                    setAAS(aasCopy);

                    copyUE.inPAE = aas.reduce(
                        (x, aa) => x && (aa.inPAE || aa.validated),
                        true
                    );

                    props.onChange(copyUE);
                }}
            />
        ));
    }

    let icon = "";

    if (StudentHasValidatedUE(props.student, ue.ref)) {
        icon = (
            <Icon
                className="text-helha_grey dark:text-white"
                path={mdiTrophy}
                size={1}
            />
        );
    } else {
        icon = (
            <Checkbox
                checked={props.ue.inPAE}
                onChange={(value) => {
                    let ueCopy = props.ue;
                    ueCopy.inPAE = value;

                    for (let i = 0; i < ueCopy.aas.length; i++) {
                        ueCopy.aas[i].inPAE = value;
                        setAAS(ueCopy.aas);
                    }

                    props.onChange(ueCopy);
                }}
            />
        );
    }

    let header = (
        <div className={"flex items-center gap-4 " + (expended ? "mb-4" : "")}>
            <div
                className="flex flex-1 gap-4 select-none cursor-pointer items-center "
                onClick={() => {
                    setExpended(!expended);
                }}
            >
                {expender}

                <div className="flex-1">{ueInfos.name}</div>

                <div
                    className={
                        props.ue.inPAE ? "text-helha_blue" : "text-gray-400"
                    }
                >
                    {ueInfos.credits +
                        " " +
                        (ueInfos.credits > 1 ? "Crédits" : "Crédit")}
                </div>
            </div>
            {icon}
        </div>
    );

    return (
        <div
            className={
                "transition-all p-4 my-2 flex flex-col rounded " +
                (expended ? "bg-white dark:bg-helha_grey shadow" : "")
            }
        >
            {header}

            <div className="pl-10 flex gap-2 flex-col">{aasList}</div>
        </div>
    );
}

function Bloc(props) {
    let bloc = props.bloc;

    const [ues, setUES] = useState(props.student.ues);

    if (StudentHasValidatedBloc(props.student, bloc.id)) {
        return "";
    }

    return (
        <>
            <div className="text-helha_blue pb-2 text-3xl pt-2 border-b-2 border-helha_blue mb-4 sticky top-0 bg-white dark:bg-helha_grey ">
                <div className="max-w-2xl mx-auto px-4 flex gap-4 items-end">
                    {bloc.name.toUpperCase()}{" "}
                    <div className="flex flex-col">
                        <div className="text-base font-bold text-black dark:text-white">
                            {StudentPAECreditsBloc(props.student, bloc) +
                                " Crédits"}
                        </div>
                        <div className="text-xs">
                            {StudentValidatedCreditsBloc(props.student, bloc) +
                                " Crédits · Validée"}
                        </div>
                    </div>
                    <div className="flex-1" />
                    <Icon
                        path={mdiCheckAll}
                        size={1.2}
                        className="text-helha_blue select-none cursor-pointer"
                        onClick={() => {
                            let uesCopy = [...ues];

                            let paeState = ues.reduce(
                                (x, ue) =>
                                    x &&
                                    (ue.bloc != bloc.id ||
                                        ue.inPAE ||
                                        ue.validated),
                                true
                            );

                            for (let i = 0; i < uesCopy.length; i++) {
                                if (uesCopy[i].bloc == bloc.id) {
                                    uesCopy[i].inPAE = !paeState;

                                    for (
                                        let j = 0;
                                        j < uesCopy[i].aas.length;
                                        j++
                                    ) {
                                        uesCopy[i].aas[j].inPAE = !paeState;
                                    }
                                }
                            }

                            setUES(uesCopy);

                            let copyStudent = props.student;
                            copyStudent.ues = uesCopy;

                            props.onChange(copyStudent);
                        }}
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                {ues
                    .filter((ue) => ue.bloc === bloc.id)
                    .map((ue, index) => (
                        <UE
                            key={index}
                            ue={ue}
                            section={props.section}
                            student={props.student}
                            onChange={(ue) => {
                                let uesCopy = [...ues];

                                for (let i = 0; i < uesCopy.length; i++) {
                                    if (uesCopy[i].ref === ue.ref) {
                                        uesCopy[i] = ue;
                                    }
                                }

                                let copyStudent = props.student;
                                copyStudent.ues = uesCopy;
                                setUES(uesCopy);

                                props.onChange(copyStudent);
                            }}
                        />
                    ))}
            </div>
        </>
    );
}

export default function Edit() {
    let { studentId } = useParams();
    const [student, SetStudent] = useState(false);
    const [section, SetSection] = useState(false);
    const [total, SetTotal] = useState(0);
    const [redirect, SetRedirect] = useState(false);

    useEffect(() => {
        if (!student) {
            FindStudentById(studentId).then((fetchedStudent) => {
                SetStudent(fetchedStudent);

                FindSectionFromBlocId(fetchedStudent.bloc).then(
                    (fetchedSection) => {
                        SetTotal(
                            StudentPAECredits(fetchedStudent, fetchedSection)
                        );
                        SetSection(fetchedSection);
                    }
                );
            });
        }
    });

    if (student === false || section === false) {
        return <Loading />;
    }

    if (redirect) {
        return <Redirect to={"/bloc/" + GetBlocForStudent(student)} />;
    }

    return (
        <div className="dark:bg-helha_dark_grey flex-1">
            <Header
                icon={mdiFormatListChecks}
                title={student.firstname + " " + student.lastname}
                description={
                    "Bachelier en " +
                    section.name.toLowerCase() +
                    " · " +
                    GetBlocForStudent(student).toUpperCase()
                }
            >
                <LinkButton
                    variante={OutlineWhite}
                    text="Imprimer"
                    icon={mdiPrinter}
                    to={"/feedbackpae/" + student.id}
                />

                <LinkButton
                    variante={OutlineWhite}
                    text="Envoyer"
                    icon={mdiEmail}
                    public
                    to={`mailto:${studentId}@students.helha.be?subject=Ton programme personnalisé (PAE) pour cette nouvelle année académique&body=Bonjour ${student.firstname},\n Tu trouveras ci-joint ton programme personnalisé (PAE) créé par le jury d'admission pour cette nouvelle année académique.`}
                />
            </Header>

            <div className="relative">
                {section.blocs.map((bloc, index) => (
                    <Bloc
                        key={index}
                        bloc={bloc}
                        student={student}
                        section={section}
                        onChange={(student) => {
                            SetStudent(student);
                            console.log(student);
                            console.log(StudentPAECredits(student, section));
                            SetTotal(StudentPAECredits(student, section));
                        }}
                    />
                ))}
                <div className="sticky p-4 bottom-0 z-50 w-full  ">
                    <div className="max-w-2xl mx-auto flex-row-reverse flex">
                        <DetailButton
                            text="Confirmer"
                            detail={total + " Crédits"}
                            onClick={() => {
                                let copy = student;
                                copy.paeDone = true;

                                UpdateStudent(student);
                                SetRedirect(true);
                                SetStudent(copy);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
