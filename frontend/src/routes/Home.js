import LinkButton from "../components/LinkButton";
import { OutlineBlue } from "../components/Styles";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto flex flex-col gap-2">
      <img className="p-8" src="assets/curriculum.svg" alt="" />

      <div className="mt-4">Bachelier en informatique de gestion</div>

      <LinkButton variante={OutlineBlue} text="Premier bloc" />
      <LinkButton variante={OutlineBlue} text="Deuxième bloc" />
      <LinkButton variante={OutlineBlue} text="Troisième bloc" />

      <div className="mt-4">Comptabilité</div>

      <LinkButton variante={OutlineBlue} text="Premier bloc" />
      <LinkButton variante={OutlineBlue} text="Deuxième bloc" />
      <LinkButton variante={OutlineBlue} text="Troisième bloc" />

      <div className="mt-4">Assistant·e de direction</div>

      <LinkButton variante={OutlineBlue} text="Premier bloc" />
      <LinkButton variante={OutlineBlue} text="Deuxième bloc" />
      <LinkButton variante={OutlineBlue} text="Troisième bloc" />

      <div className="mt-4">Administration</div>

      <LinkButton to="/import" text="Importer des données" />
    </div>
  );
}
