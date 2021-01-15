import { mdiAccountCircle, mdiAccountRemoveOutline, mdiUpdate } from "@mdi/js";
import { Redirect, useParams } from "react-router-dom";
import Header from "../components/Hearder";
import { FindUserById, update, deleter } from "../services/UserService";
import Button from "../components/Button";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { OutlineWhite } from "../components/Styles";

export default function User() {
  let { userId } = useParams();
  const [user, setUser] = useState(undefined);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [showModifDiv, SetShowModifDiv] = useState(false);

  useEffect(() => {
    if (user !== undefined) return;
    FindUserById(userId, function (result) {
      if (result.success) {
        setUser(result.user);
      } else {
        //
      }
    });
  });
  if (user === undefined) {
    return <Loading />;
  }

  function updateUser(user) {
    if (user.login !== "" || user.password !== "") {
      update(user.login, user.password, user.id, function (result) {
        if (result.success) {
          //FEEDBACK UTILISATEUR Mis à jour
          console.log(result.message);
        } else {
          //FEEDBACK UTILISATEUR Non mis à jour
          console.log(result.message);
        }
        console.log(result);
      });
    } else {
      SetShowModifDiv(true);
    }
  }

  function deleteUser(id) {
    deleter(id, function (result) {
      if (result.success) {
        setRedirectToReferrer(true);
      } else {
        //A FAIRE
      }
    });
  }

  if (redirectToReferrer) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="flex-grow flex flex-col items-center">
      <Header
        icon={mdiAccountCircle}
        title={"Compte de l'utilisateur " + user.login}
        description="Modifiez les informations ou supprimez le compte"
      >
        <Button
          text="Supprimer"
          icon={mdiAccountRemoveOutline}
          variante={OutlineWhite}
          onClick={() => deleteUser(userId)}
        />
        <Button
          text="Mettre à jour les informations"
          icon={mdiUpdate}
          onClick={() => updateUser(user)}
        />
      </Header>
      <div className="my-0 p-8 flex flex-col flex-grow items-center gap-4 max-w-2xl">
        <div
          id="registerDiv"
          className="bg-green-500 rounded text-white text-l px-3 text-base"
        >
          {showModifDiv ? (
            <div className="bg-green-500">
              <h1>Utilisateur correctement modifié !</h1>
            </div>
          ) : null}
        </div>
        <h1>Nom d'utilisateur : </h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          defaultValue={user.login}
          onChange={(e) => {
            user.login = e.target.value;
            setUser(user);
          }}
        />
        <h1>Mot de passe : </h1>
        <input
          type="text"
          placeholder="Mot de passe"
          onChange={(e) => {
            user.password = e.target.value;
            setUser(user);
          }}
        />
      </div>
    </div>
  );
}
