import { mdiAccountCircle, mdiAccountPlus } from "@mdi/js";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Hearder";
import LinkButton from "../components/LinkButton";
import { FindAllUsers } from "../services/UserService";

export function User(props) {
  let user = props.user;
  return (
    <tr>
      <td>
        <Link to={"/user/" + user.id}>
          <center>{user.id}</center>
        </Link>
      </td>
      <td>
        <Link to={"/user/" + user.id}>
          <center>{user.login}</center>
        </Link>
      </td>
      <td>
        <center>{user.password}</center>
      </td>
      <td>
        <center>{user.role}</center>
      </td>
    </tr>
  );
}

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pseudo: "admin",
      users: FindAllUsers(),
    };
  }

  render() {
    return (
      <div className="flex-grow flex flex-col items-center">
        <Header
          icon={mdiAccountCircle}
          title="Modification des utilisateurs"
          description="Faites votre choix"
        >
          <LinkButton
            icon={mdiAccountPlus}
            to="/register"
            text="Créer un compte de type secrétaire"
            className="px-3"
          />
        </Header>
        <div className="my-0 p-8 flex flex-col flex-grow items-center gap-4 max-w-2xl">
          <h1 className="text-xl">Bienvenue Monsieur {this.state.pseudo}</h1>

          <div>
            <div className="flex flex-col w-full p-3 gap-2">
              <table
                className="border-2 shadow-2xl " /*className="table-auto"*/
              >
                <thead>
                  <tr className="border-b-2 text-l">
                    <th>Id</th>
                    <th>Login</th>
                    <th>Mot de passe</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, index) => (
                    <User key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link to="/" className="text-helha_blue underline font-bold">
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }
}
