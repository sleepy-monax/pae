import Header from "../components/Hearder";
import { FindById } from "../services/StudentsService";
import { mdiEmail, mdiLaptop, mdiPrinter } from "@mdi/js";
import { FindBlock } from "../services/BlocService";
import { Link } from "react-router-dom";
import Button from "../components/Button";

//Charge and configure student display
export function Student(props) {
  let student = props.student;
  return (
    <tr>
      <td>
        <Link to={"/edit/" + student.id}>
          <center>
            {student.firstname} {student.lastname}
          </center>
        </Link>
      </td>
      <td>
        <center>AHHH</center>
      </td>
      <td>
        <center>
          <input type="checkbox" />
        </center>
      </td>
    </tr>
  );
}

export default function Bloc(blocId) {
  let bloc = FindBlock(blocId);

  return (
    <div>
      {/*  Display the header */}
      <Header
        icon={mdiLaptop}
        title={bloc.blocName}
        description={"Bloc " + bloc.blocNumber}
      >
        <Button text="Imprimer" icon={mdiPrinter} />
        <Button text="Envoyer" icon={mdiEmail} />
      </Header>

      {/*  Display all students */}
      <div className="py-20 h-screen px-2 ">
        <div className="flex flex-col w-full p-3 gap-2">
          <table className="border-2 shadow-2xl">
            <thead>
              <tr className="border-b-2">
                <th>Nom et prénom</th>
                <th>Progression</th>
                <th>Fait?</th>
              </tr>
            </thead>
            <tbody>
              {/*  Search all students */}
              {DATA.map((student, index) => (
                <Student key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const DATA = [
  {
    id: "la1234",
    firstname: "Ayaan",
    lastname: "gagaga",
  },
  {
    id: "la1274",
    firstname: "dfghjk",
    lastname: "pmlolikjh",
  },
];
