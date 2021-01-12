import LinkButton from "../components/LinkButton";
import { OutlineBlue } from "../components/Styles";

export default function Home() {
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
        <div className="mt-4">Bachelier en informatique de gestion</div>

        <LinkButton variante={OutlineBlue} text="Premier bloc" to="/bloc/IG1" />

        <LinkButton
          variante={OutlineBlue}
          text="Deuxième bloc"
          to="/bloc/IG1"
        />

        <LinkButton
          variante={OutlineBlue}
          text="Troisième bloc"
          to="/bloc/IG1"
        />

        <div className="mt-4">Comptabilité</div>

        <LinkButton variante={OutlineBlue} text="Premier bloc" to="/bloc/IG1" />

        <LinkButton
          variante={OutlineBlue}
          text="Deuxième bloc"
          to="/bloc/IG1"
        />

        <LinkButton
          variante={OutlineBlue}
          text="Troisième bloc"
          to="/bloc/IG1"
        />

        <div className="mt-4">Assistant·e de direction</div>

        <LinkButton variante={OutlineBlue} text="Premier bloc" to="/bloc/IG1" />

        <LinkButton
          variante={OutlineBlue}
          text="Deuxième bloc"
          to="/bloc/IG1"
        />

        <LinkButton
          variante={OutlineBlue}
          text="Troisième bloc"
          to="/bloc/IG1"
        />

        <div className="mt-4">Administration</div>

        <LinkButton to="/import" text="Importer des données" />
      </div>
    </div>
  );
}
