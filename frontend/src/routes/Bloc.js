import Header from "../components/Hearder";
import { mdiEmail, mdiLaptop, mdiPrinter } from "@mdi/js";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { FindStudentsByBloc } from "../services/StudentsService";
import {
    FindBlockById,
    FindSectionFromBlocId,
} from "../services/SectionService";

import Loading from "../components/Loading";

import { useEffect, useState } from "react";
import { StudentHasValidatedUE } from "../model/Student";

// Charge the students' data into a table
// Configuration of datas
export function Progress(props) {
    return (
        <div className="h-3 relative rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
                style={{ width: props.value + "%" }}
                className="h-full bg-helha_blue relative"
            ></div>
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

  console.log(student);
  
    return (
        <tr>
            {/*  Student name */}
            <td>
                <Link to={"/student/" + student.id}>
                    {student.lastname} {student.firstname}
                </Link>
            </td>

            {/*  Progress bar per bloc */}

            {/*  Bloc 1 */}
            <td>
                <Progress
                    value={SumBloc(student, student.ues, blocs[0], blocs[0].id)}
                />
            </td>

            {/*  Bloc 2 */}
            <td>
                <Progress
                    value={SumBloc(student, student.ues, blocs[1], blocs[1].id)}
                />
            </td>

            {/*  Bloc 3 */}
            <td>
                <Progress
                    value={SumBloc(student, student.ues, blocs[2], blocs[2].id)}
                />
            </td>

            {/*  Check box, checked if the pae is done */}
            <td>
                <center>
                    <input type="checkbox" />
                </center>
            </td>
        </tr>
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
        <div className="bg-gray-100 dark:bg-helha_dark_grey flex-1">
            {/*  Display the header */}
            <Header
                icon={mdiLaptop}
                title={state.bloc.name}
                description={state.section.name}
            >
                <Button text="Imprimer" icon={mdiPrinter} />
                <Button text="Envoyer" icon={mdiEmail} />
            </Header>

            {/*  Display all students */}

            <div className="shadow rounded p-4 my-8 bg-white dark:bg-helha_grey max-w-4xl mx-auto flex flex-col  gap-2">
                <table>
                    <thead>
                        <tr className="border-b-2">
                            <th>Nom et prénom</th>
                            <th className="flex-1">Bloc 1</th>
                            <th className="flex-1">Bloc 2</th>
                            <th className="flex-1">Bloc 3</th>
                            <th>Fait?</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/*  Search all students */}

                        {state.students.map((student, index) => (
                            <Student
                                key={student.id}
                                student={student}
                                blocs={state.section.blocs}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
