import { mdiFormatListChecks } from "@mdi/js";
import { useParams } from "react-router";
import Header from "../components/Hearder";
import { FindById } from "../services/StudentsService";

export default function EditPae() {
    let { studentId } = useParams();

    let student = FindById(studentId);

    return <div>
        <Header icon={mdiFormatListChecks} title={student.firstname + " " + student.lastname} description="Bachelier en informatique de gestion" />
    </div>;
}