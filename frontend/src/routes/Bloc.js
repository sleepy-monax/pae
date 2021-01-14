import Header from "../components/Hearder";
import { mdiEmail, mdiLaptop, mdiPrinter, mdiStackpath } from "@mdi/js";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { FindStudentsByBloc } from "../services/StudentsService";
import {
  FindBlockById,
  FindSectionFromBlocId,
} from "../services/SectionService";

import Loading from "../components/Loading";

import { useEffect, useState } from "react";

// Charge the students' data into a table
// Configuration of datas
export function Student(props) {
  let student = props.student;
  return (
    <tr>
      {/*  Student name */}
      <td>
        <Link to={"/edit/" + student.id}>
          <center>
            {student.firstname} {student.lastname}
          </center>
        </Link>
      </td>

      {/*  Progress bar per bloc */}
      <td className="flex gap-2">
        {/*  Bloc 1 */}
        <td className="flex-1">
          <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
              class="barBloc1"
              style={{ width: "100%" }}
              className="h-full bg-helha_blue relative"
            ></div>
          </div>
        </td>

        {/*  Bloc 2 */}
        <td className="flex-1">
          <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
              class="barBloc2"
              style={{ width: "30%" }}
              className="h-full bg-helha_blue relative"
            ></div>
          </div>
        </td>

        {/*  Bloc 3 */}
        <td className="flex-1">
          <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div
              class="barBloc3"
              style={{ width: "60%" }}
              className="h-full bg-helha_blue relative"
            ></div>
          </div>
        </td>
      </td>

      {/*  Check box, checked if the pae is done */}
      <td>
        <center>
          <input class="paeDone" type="checkbox" />
        </center>
      </td>
    </tr>
  );
}

export default function Bloc() {
  // Find the bloc id
  let { blocId } = useParams();

  /*let section = FindSectionFromBlocId(blocId);*/
  /*let bloc = FindBlockById(blocId);*/
  /*let students = FindStudentsByBloc(blocId);*/

  let [state, setState] = useState(undefined);

  useEffect(() => {
    if (state != undefined) {
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

  if (state == undefined) {
    return <Loading />;
  }

  console.log(state);

  return (
    <div>
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
      <div className="py-4 px-2">
        <div className="flex flex-col w-full p-3 gap-2">
          <table className="border-2 shadow-2xl">
            <thead>
              <tr className="border-b-2">
                <th>Nom et prénom</th>
                <center>
                  <b>Progression</b>
                </center>
                <th className="flex">
                  <th className="flex-1">Bloc 1</th>
                  <th className="flex-1">Bloc 2</th>
                  <th className="flex-1">Bloc 3</th>
                </th>
                <th>Fait?</th>
              </tr>
            </thead>

            <tbody>
              {/*  Search all students */}

              {state.students.map((student, index) => (
                <Student key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
