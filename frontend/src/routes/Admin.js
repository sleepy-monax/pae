import { mdiAccountEdit, mdiAccountMultipleCheck, mdiAccountPlus } from "@mdi/js";
import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

const backgroundStyle = {
    backgroundSize: "cover",
    backgroundImage: "url(assets/background.jpg)",
};

const containerStyle = {
    backdropFilter: "blur(4px)",
};

export default class Admin extends React.Component {
    constructor(props) {
        super (props);

        this.state = { pseudo : "admin"};
    }

    render() {
        return (
            <div
                style={backgroundStyle}
                className="flex-grow flex flex-row justify-center"
            >
                <div
                    style={containerStyle}
                    className="my-0 p-8 bg-helha_grey bg-opacity-50 flex flex-col flex-grow items-center gap-4 max-w-2xl"
                >
                    <img src="assets/logo.png" className="m-8" alt=""></img>

                    <h1 className="text-white text-xl">Bienvenue Monsieur {this.state.pseudo}</h1>

                    <LinkButton icon={mdiAccountPlus} to="/register" text="Créer un compte de type secrétaire" className="px-3"/>
                    <LinkButton icon={mdiAccountMultipleCheck} to="/list" text="Afficher la liste des comptes créés"/>
                    <LinkButton icon={mdiAccountEdit} text="Modifier un compte"/>

                    <Link to="/" className="text-helha_blue underline font-bold">
                        Retourner à l'accueil
                    </Link>
                </div>
            </div>
        )
    }
}