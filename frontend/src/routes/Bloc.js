import Header from "../components/Hearder";
import { mdiAccount, mdiEmail, mdiLaptop, mdiPrinter } from "@mdi/js";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { FindStudentsByBloc } from "../services/StudentsService";
import {
    FindBlockById,
    FindSectionFromBlocId,
} from "../services/SectionService";

import Loading from "../components/Loading";

import { useEffect, useState } from "react";
import {
    StudentHasValidatedUE,
    StudentValidatedCreditsBloc,
} from "../model/Student";
import Icon from "@mdi/react";

// Charge the students' data into a table
// Configuration of datas
export function Progress(props) {
    return (
        <div
            className={
                "h-3 relative rounded-full overflow-hidden flex items-center " +
                props.className
            }
        >
            <div className="w-full h-full flex-1 bg-gray-200 absolute" />
            <div
                style={{ width: props.value + "%" }}
                className="h-full bg-helha_blue absolute"
            />
            <div className="text-xs pl-2 absolute left-0 w-full text-center text-black">
                {props.text}
            </div>
        </div>
    );
}

// Sum of the credits to diplay it proprely later
function SumBloc(student, ues, blocs, numBloc) {
    let somme = 0;
    let ueBloc = [];

    // Configure the ues to correspond with the ues' bloc
    ues.forEach((ue) => {
        if (ue.bloc === numBloc) {
            ueBloc.push(ue);
        }
    });

    // Verify if the bloc is validated
    for (let i = 0; i < ueBloc.length; i++) {
        if (StudentHasValidatedUE(student, ueBloc[i].ref)) {
            somme += blocs.ues[i].credits;
        }
    }
    return (somme / 6) * 10;
}

// Display a student in the page
export function Student(props) {
    let student = props.student;
    let blocs = props.blocs;

    return (
        <div className="flex flex-row px-4 py-2 items-center">
            <Link
                to={"/student/" + student.id}
                className="flex flex-1 items-center"
            >
                <Icon path={mdiAccount} size={1} className="mr-2" />
                <div className="flex-1">
                    {student.lastname} {student.firstname}
                </div>
                <div className="flex flex-1 max-w-sm gap-2 items-center">
                    <Progress
                        text="1"
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[0]) /
                                6) *
                            10
                        }
                    />
                    <Progress
                        text="2"
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[1]) /
                                6) *
                            10
                        }
                    />
                    <Progress
                        text="3"
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[2]) /
                                6) *
                            10
                        }
                    />
                </div>
            </Link>
            <input type="checkbox" />
        </div>
    );
}

// Display all student in the page
export default function Bloc() {
    // Find the bloc id
    let { blocId } = useParams();

    let [state, setState] = useState(undefined);

    // Find the datas' in the database
    useEffect(() => {
        if (state !== undefined) {
            return;
        }

        Promise.all([
            FindBlockById(blocId),
            FindSectionFromBlocId(blocId),
            FindStudentsByBloc(blocId),
        ]).then((data) =>
            setState({ bloc: data[0], section: data[1], students: data[2] })
        );
    });

    if (state === undefined) {
        return <Loading />;
    }

    return (
        <div className=" flex-1">
            {/*  Display the header */}
            <Header
                icon={mdiLaptop}
                title={state.bloc.name}
                description={state.section.name}
            >
                <Button text="Imprimer" icon={mdiPrinter} />
                <Button text="Envoyer" icon={mdiEmail} />
            </Header>

            <div className="relative max-w-2xl mx-auto flex flex-col  gap-2">
                {state.students.map((student, index) => (
                    <Student
                        key={student.id}
                        student={student}
                        blocs={state.section.blocs}
                    />
                ))}
            </div>
        </div>
    );
}
