import {
  mdiEmail,
  mdiFormatListChecks,
  mdiPrinter,
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

function AA(props) {
  let aa = props.aa;

  return <div>{aa.name}</div>;
}

function UE(props) {
  let ue = props.ue;

  const [expended, setExpended] = useState(false);

  return (
    <div className="px-2 py-4 flex gap-4 flex-col">
      <div
        className="flex select-none cursor-pointer"
        onClick={() => {
          setExpended(!expended);
        }}
      >
        <Icon
          className="mr-2"
          path={expended ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal}
          size={1}
        />
        {ue.name}
      </div>

      {expended ? ue.aas.map((aa, index) => <AA key={index} aa={aa} />) : ""}
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
        <UE key={index} ue={ue} />
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

        FindSectionFromBlocId(fetchedStudent.bloc).then((fetchedSection) =>
          SetSection(fetchedSection)
        );
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
        description={section.name + " · " + student.bloc.toUpperCase()}
      >
        <DetailButton text="Confirmer" detail="60 Crédits" />

        <Button variante={OutlineWhite} text="Imprimer" icon={mdiPrinter} />
        <Button variante={OutlineWhite} text="Envoyer" icon={mdiEmail} />
      </Header>

      <div className="max-w-2xl mx-auto my-8 p-4 bg-white dark:bg-helha_grey rounded shadow-lg">
        {section.blocs
          .filter((bloc) => bloc.id <= student.bloc)
          .map((bloc, index) => (
            <Bloc key={index} bloc={bloc} />
          ))}
      </div>
    </div>
  );
}
