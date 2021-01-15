import Header from "../components/Hearder";
import { mdiAlertCircleOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Error() {
    return (
        <div className="flex flex-col flex-1">
            <Header
                icon={mdiAlertCircleOutline}
                title="Erreur 404"
                description="La page que vous avez demandé n'existe pas."
            ></Header>

            <div className=" flex flex-col items-center flex-1 bg-white">
                <img
                    src={process.env.PUBLIC_URL + "/assets/lost.svg"}
                    className="p-16 max-w-md"
                    alt=""
                ></img>
                <Link to="/">
                    <Button text="Revenir a l'accueil" />
                </Link>
            </div>
        </div>
    );
}
