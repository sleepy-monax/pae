import { useEffect, useState } from "react";
import LinkButton from "../components/LinkButton";
import Loading from "../components/Loading";
import { OutlineBlue } from "../components/Styles";
import { FindAllSections } from "../services/SectionService";

function Bloc(props) {
  let bloc = props.bloc;

  return (
    <LinkButton
      variante={OutlineBlue}
      text={bloc.name}
      to={"/bloc/" + bloc.id}
    />
  );
}

function Section(props) {
  let section = props.section;

  return (
    <>
      <div className="mt-4">{section.name}</div>
      {section.blocs.map((bloc, index) => (
        <Bloc key={index} bloc={bloc} />
      ))}
    </>
  );
}

export default function Home() {
  let [sections, setSections] = useState(false);

  useEffect(() => {
    if (!sections) {
      FindAllSections().then((sections) => setSections(sections));
    }
  });

  let sectionsComponents = <Loading />;

  if (sections === null) {
    sectionsComponents = (
      <div>Aucunes données disponibles, veuillez en importer</div>
    );
  } else if (sections) {
    sectionsComponents = sections.map((section, index) => (
      <Section key={index} section={section} />
    ));
  }

  return (
    <div className="">
      <div className="bg-white">
        <img
          className="max-w-xs mx-auto py-8"
          src="/assets/curriculum.svg"
          alt=""
        />
      </div>
      <div className="max-w-xl mx-auto flex flex-col gap-2 pb-8 px-4">
        {sectionsComponents}

        <div className="mt-4">Administration</div>

        <LinkButton to="/import" text="Importer des données" />
      </div>
    </div>
  );
}
