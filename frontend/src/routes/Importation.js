import Header from "../components/Hearder";

import { mdiTableArrowUp } from '@mdi/js'

export default function Importation() {
    return <div>
        <Header icon={mdiTableArrowUp} title="Importation" description="Veuillez choisir le fichier d’étudiants à importer">
        </Header>
    </div>;
}