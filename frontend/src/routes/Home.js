import LinkButton from "../components/LinkButton";
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
  let sections = FindAllSections();

  return (
    <div className="">
      <div className="bg-white">
        <img
          className="max-w-xs mx-auto py-8"
          src="assets/curriculum.svg"
          alt=""
        />
      </div>
      <div className="max-w-xl mx-auto flex flex-col gap-2 pb-8 px-4">
        {sections.map((section, index) => (
          <Section key={index} section={section} />
        ))}

        <div className="mt-4">Administration</div>

        <LinkButton to="/import" text="Importer des données" />
      </div>
    </div>
  );
}
