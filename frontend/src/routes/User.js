import {mdiAccountCircle, mdiAccountRemoveOutline, mdiUpdate} from "@mdi/js";
import {useParams} from "react-router-dom";
import Header from "../components/Hearder";
import {FindUserById, update} from "../services/UserService";
import Button from "../components/Button";
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
            }
        );
    })
    if (user === undefined) {
        return <Loading/>;
    }

    function updateUser(user) {
      if (user.login !== "" && user.password !== "") {
        update(
          user.login,
          user.password,
          user.id,
          function (result) {
            if (result.success) {
              //FEEDBACK UTILISATEUR Mis à jour
              console.log(result.message);
            } else {
              //FEEDBACK UTILISATEUR Non mis à jour
              console.log(result.message);
            }
            console.log(result);
          }
        );
      }
    }

    return (
        <div className="flex-grow flex flex-col items-center">
            <Header
                icon={mdiAccountCircle}
                title={"Compte de l'utilisateur " + user.login}
                description="Modifiez les informations ou supprimez le compte"
            >
                <Button text="Supprimer" icon={mdiAccountRemoveOutline}/>
                <Button text="Mettre à jour les informations" icon={mdiUpdate} onClick={() => updateUser(user)}/>
            </Header>
            <div className="my-0 p-8 flex flex-col flex-grow items-center gap-4 max-w-2xl">
                <h1>Nom d'utilisateur : </h1>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    defaultValue={user.login}
                    onChange={(e) => {user.login = e.target.value; setUser(user)}
                    }
                />
                <h1>Mot de passe : </h1>
                <input
                    type="text"
                    placeholder="Mot de passe"
                    onChange={(e) => {user.password = e.target.value; setUser(user)}}
                />
                <h1>Role</h1>
                <label>
                    <input
                        type="checkbox"
                        name="checkedAdmin"
                    />
                    Admin
                </label>
            </div>
        </div>
    );
}
