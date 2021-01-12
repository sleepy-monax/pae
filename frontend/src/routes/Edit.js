import {
  mdiEmail,
  mdiFormatListChecks,
  mdiPrinter,
  mdiUnfoldLessHorizontal,
  mdiUnfoldMoreHorizontal,
} from "@mdi/js";
import { useParams } from "react-router";
import Icon from "@mdi/react";

import DetailButton from "../components/DetailButton";
import Header from "../components/Hearder";
import { FindById } from "../services/StudentsService";
import Button from "../components/Button";
import { useState } from "react";

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

      {expended ? ue.AAs.map((aa, index) => <AA key={index} aa={aa} />) : ""}
    </div>
  );
}

function Bloc(props) {
  let bloc = props.bloc;
  return (
    <div>
      <div className="text-helha_blue pt-4 pb-2 text-2xl border-b-2 border-helha_blue mb-4">
        {bloc.name.toUpperCase()}
      </div>

      {bloc.UEs.map((ue, index) => (
        <UE key={index} ue={ue} />
      ))}
    </div>
  );
}

let TEST_AA = {
  name: "Mathématique",
  credits: 5,
};

let TEST_UE = {
  name: "Mathématique appliquée et traitement de données",
  AAs: [TEST_AA, TEST_AA],
};

let TEST_SECTION = {
  name: "Bachelier en informatique de gestion",
  blocs: [
    { name: "bloc 1", UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE] },
    { name: "bloc 2", UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE] },
    { name: "bloc 3", UEs: [TEST_UE, TEST_UE, TEST_UE, TEST_UE, TEST_UE] },
  ],
};

export default function Edit() {
  let { studentId } = useParams();

  let student = FindById(studentId);
  let section = TEST_SECTION;

  return (
    <div className="bg-gray-100 dark:bg-helha_dark_grey">
      <Header
        icon={mdiFormatListChecks}
        title={student.firstname + " " + student.lastname}
        description={section.name}
      >
        <DetailButton text="Confirmer" detail="60 Crédits" />

        <Button text="Imprimer" icon={mdiPrinter} />
        <Button text="Envoyer" icon={mdiEmail} />
      </Header>

      <div className="max-w-2xl mx-auto my-8 p-4 bg-white dark:bg-helha_grey rounded shadow-lg">
        {section.blocs.map((bloc, index) => (
          <Bloc key={index} bloc={bloc} />
        ))}
      </div>

      <div></div>
    </div>
  );
}
