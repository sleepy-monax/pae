import {mdiAccountCircle, mdiAccountRemoveOutline, mdiUpdate} from "@mdi/js";
import {useParams} from "react-router-dom";
import Header from "../components/Hearder";
import {FindUserById} from "../services/UserService";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";
import React from "react";
import {useEffect, useState} from "react";
import Loading from "../components/Loading";

export default function User() {
    let {userId} = useParams();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (user !== undefined) return;
        FindUserById(userId,
            function (result) {
                if (result.success) {
                    setUser(result.user);
                } else {
                    //A FAIRE
                }
            }.bind(this)
        );
    })
    if (user === undefined) {
        return <Loading/>;
    }
    return (
        <div className="flex-grow flex flex-col items-center">
            <Header
                icon={mdiAccountCircle}
                title={"Compte de l'utilisateur " + user.login}
                description="Modifiez les informations ou supprimez le compte"
            >
                <Button text="Supprimer" icon={mdiAccountRemoveOutline}/>
            </Header>
            <div className="my-0 p-8 flex flex-col flex-grow items-center gap-4 max-w-2xl">
                <h1>Nom d'utilisateur : </h1>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={user.login}
                    onChange={handlePassword}
                />
                <h1>Mot de passe : </h1>
                <input
                    type="text"
                    placeholder="Mot de passe"
                    value=""
                    onChange={handleLogin}
                />
                <h1>Role</h1>
                <label>
                    <input
                        type="checkbox"
                        name="checkedAdmin"
                    />
                    Admin
                </label>
                <LinkButton to="/admin" text="Mettre à jour les informations" icon={mdiUpdate}/>
            </div>
        </div>
    );
}


function handlePassword() {

}

function handleLogin() {

}
