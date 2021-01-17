import Header from "../components/Hearder";
import {
    mdiAccount,
    mdiCheckCircle,
    mdiCircleOutline,
    mdiEmail,
    mdiLaptop,
    mdiPrinter,
} from "@mdi/js";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { FindStudentsByBloc } from "../services/StudentsService";
import {
    FindBlockById,
    FindSectionFromBlocId,
} from "../services/SectionService";

import Loading from "../components/Loading";

import { useEffect, useState } from "react";
import { StudentValidatedCreditsBloc } from "../model/Student";
import Icon from "@mdi/react";
import { GenerateAllPAE } from "../services/GeneratePaePdfService";

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
        </div>
    );
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
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[0]) /
                                6) *
                            10
                        }
                    />
                    <Progress
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[1]) /
                                6) *
                            10
                        }
                    />
                    <Progress
                        className="flex-1"
                        value={
                            (StudentValidatedCreditsBloc(student, blocs[2]) /
                                6) *
                            10
                        }
                    />
                </div>
            </Link>
            {student.paeDone ? (
                <Icon
                    className="text-helha_blue ml-2"
                    path={mdiCheckCircle}
                    size={1}
                />
            ) : (
                <Icon className="ml-2" path={mdiCircleOutline} size={1} />
            )}
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
                <Button
                    text="Télécharger tous les PAE"
                    icon={mdiPrinter}
                    onClick={() => GenerateAllPAE(state.students, state.section, state.section.blocs)} 
                />
            </Header>

            <div className="text-helha_blue pb-2 text-2xl pt-2 z-50 border-b-2 border-helha_blue mb-4 sticky top-0 bg-white dark:bg-helha_grey shadow-lg">
                <div className="max-w-2xl mx-auto px-4 flex gap-4 items-start">
                    <div className="flex-1 ">
                        <div>Étudiants</div>
                        <div className="text-sm text-helha_grey dark:text-white">
                            {state.section.name}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        Progression
                        <div className="flex flex-row flex-1">
                            <div className="flex-1 text-sm text-helha_grey  dark:text-white">
                                Bloc 1
                            </div>
                            <div className="flex-1 text-sm text-helha_grey  dark:text-white">
                                Bloc 2
                            </div>
                            <div className="flex-1 text-sm text-helha_grey  dark:text-white">
                                Bloc 3
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-2xl mx-auto flex flex-col gap-2 mb-4">
                {state.students.map((student, index) => (
                    <Student
                        key={student.id + " " + student.paeDone}
                        student={student}
                        blocs={state.section.blocs}
                    />
                ))}
            </div>
        </div>
    );
}
