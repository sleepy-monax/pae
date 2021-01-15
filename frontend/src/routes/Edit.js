import {
    mdiCheck,
    mdiCheckboxBlank,
    mdiCheckboxBlankOutline,
    mdiCheckBoxOutline,
    mdiEmail,
    mdiFormatListChecks,
    mdiPrinter,
    mdiSquare,
    mdiSquareEditOutline,
    mdiSquareRounded,
    mdiSquareRoundedOutline,
    mdiTrophy,
    mdiUnfoldLessHorizontal,
    mdiUnfoldMoreHorizontal,
} from "@mdi/js";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Icon from "@mdi/react";

import { FindSectionFromBlocId } from "../services/SectionService";
import { FindStudentById } from "../services/StudentsService";
import { OutlineWhite } from "../components/Styles";
import Button from "../components/Button";
import DetailButton from "../components/DetailButton";
import Header from "../components/Hearder";
import Loading from "../components/Loading";
import { StudentHasValidatedAA, StudentHasValidatedUE } from "../model/Student";

function AA(props) {
    let aa = props.aa;

    console.log("aa: ", aa);

    if (StudentHasValidatedAA(props.student, aa.id)) {
        return (
            <div className="gap-4 flex items-center">
                <div className="flex-1 p-2">{aa.name}</div>
                <Icon
                    className="text-helha_grey dark:text-white"
                    path={mdiCheck}
                    size={1}
                />
            </div>
        );
    }

    return (
        <div className="gap-4 flex items-center">
            <div className="flex-1 p-2">{aa.name}</div>
            <Icon
                className="text-helha_blue"
                path={mdiCheckboxBlankOutline}
                size={1}
            />
        </div>
    );
}

function UE(props) {
    let ue = props.ue;

    const [expended, setExpended] = useState(false);

    let expender = (
        <Icon
            path={expended ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal}
            size={1}
        />
    );

    let aas;
    if (expended) {
        aas = ue.aas.map((aa, index) => (
            <AA key={index} aa={aa} student={props.student} />
        ));
    }

    let icon = (
        <Icon
            className="text-helha_grey dark:text-white"
            path={mdiTrophy}
            size={1}
        />
    );

    if (!StudentHasValidatedUE(props.student, ue.id)) {
        icon = (
            <Icon
                className="text-helha_blue"
                path={mdiCheckboxBlankOutline}
                size={1}
            />
        );
    }

    let header = (
        <div className={"flex " + (expended ? "mb-4" : "")}>
            <div
                className="flex flex-1 gap-4 select-none cursor-pointer "
                onClick={() => {
                    setExpended(!expended);
                }}
            >
                {expender}
                <div className={expended ? "font-bold" : ""}>{ue.name}</div>
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

            <div className="pl-8">{aas}</div>
        </div>
    );
}

function Bloc(props) {
    let bloc = props.bloc;
    return (
        <>
            <div className="text-helha_blue pt-4 pb-2 text-2xl border-b-2 border-helha_blue mb-4">
                {bloc.name.toUpperCase()}
            </div>

            {bloc.ues.map((ue, index) => (
                <UE key={index} ue={ue} student={props.student} />
            ))}
        </>
    );
}

export default function Edit() {
    let { studentId } = useParams();
    const [student, SetStudent] = useState(false);
    const [section, SetSection] = useState(false);

    useEffect(() => {
        if (!student) {
            FindStudentById(studentId).then((fetchedStudent) => {
                SetStudent(fetchedStudent);

                FindSectionFromBlocId(
                    fetchedStudent.bloc
                ).then((fetchedSection) => SetSection(fetchedSection));
            });
        }
    });

    if (student === false || section === false) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-100 dark:bg-helha_dark_grey flex-1">
            <Header
                icon={mdiFormatListChecks}
                title={student.firstname + " " + student.lastname}
                description={
                    "Bachelier en " +
                    section.name.toLowerCase() +
                    " · " +
                    student.bloc.toUpperCase()
                }
            >
                <DetailButton text="Confirmer" detail="60 Crédits" />

                <Button
                    variante={OutlineWhite}
                    text="Imprimer"
                    icon={mdiPrinter}
                />
                <Button
                    variante={OutlineWhite}
                    text="Envoyer"
                    icon={mdiEmail}
                />
            </Header>

            <div className="max-w-2xl mx-auto my-8">
                {section.blocs
                    .filter((bloc) => bloc.id <= student.bloc)
                    .map((bloc, index) => (
                        <Bloc key={index} bloc={bloc} student={student} />
                    ))}
            </div>
        </div>
    );
}
