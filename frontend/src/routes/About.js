import { mdiInformationOutline } from "@mdi/js";
import Header from "../components/Hearder";
import Hero from "../components/Hero";
import React from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-16 bg-white">
        <img src="assets/logo-full.png" className="pr-8" alt="" />
      </div>
      <Header
        icon={mdiInformationOutline}
        title="À propos"
        description="v1.0.0 publiée le 18/01/2021 code-name 'pinpin'."
      />
      <div className="max-w-4xl m-8">
        <div className="text-xl mb-4">Application réalisé avec ❤️ par</div>

        <div className="flex flex-col gap-4">
          <Hero name="Sasha Dhaeyer" linkedin="" pic="assets/sasha.png" />

          <Hero
            name="Mathieu Trempont"
            linkedin="mathieu-trempont-a6b60117b"
            pic="assets/mathieu.png"
          />

          <Hero
            name="Guillaume Charlier"
            linkedin="charlier-guillaume-b750b21ab"
            pic="assets/guillaume.png"
          />

          <Hero
            name="Nicolas Van Bossuyt"
            linkedin="nicolas-van-bossuyt"
            pic="assets/nicolas.png"
          />
        </div>

        <div className="mt-4">
          Étudiants en informatique de gestion à la HELHa Campus Mons, dans le
          cadre du cours d'Applications entreprise multi-tiers de Mr. V.
          Altares.
        </div>

        <div className="mt-8">
          <span className="text-xl ">Stats pour les nerds 🤓</span>
          <div>React v{React.version}</div>
          <div>TailwindCSS v2.0.0</div>
        </div>
      </div>
    </div>
  );
}
