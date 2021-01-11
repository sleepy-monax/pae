import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
    return (
        <div className="max-w-md mx-auto flex items-center flex-col">
            <img className="p-8" src="assets/curriculum.svg" alt="" />

            <Link to="/import">
                <Button text="Importer des données" />
            </Link>
        </div>
    );
}