import Header from "../components/Hearder";
import { mdiAlertCircleOutline } from '@mdi/js'
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="flex flex-col">
            <Header icon={mdiAlertCircleOutline} title="Erreur 404" description="La page que vous avez demandée n'existe pas.">
                <Link to="/">Revenire a l'accueil</Link>
            </Header>

            <img src="assets/lost.svg" className="p-16 flex-grow mx-auto max-w-md" alt=""></img>
        </div>);
}