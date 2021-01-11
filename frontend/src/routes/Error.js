import Header from "../components/Hearder";
import { mdiAlertCircleOutline } from '@mdi/js'
import { Link } from "react-router-dom";
import Button, { OutlineBlue } from "../components/Button";

export default function Error() {
    return (
        <div className="flex flex-col">
            <Header icon={mdiAlertCircleOutline} title="Erreur 404" description="La page que vous avez demandé n'existe pas.">
            </Header>

            <div className="mx-auto max-w-md flex flex-col items-center">
                <img src="assets/lost.svg" className="p-16" alt=""></img>
                <Link to="/">
                    <Button text="Revenire a l'accueil" />
                </Link>
            </div>
        </div>);
}