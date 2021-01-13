import React from "react";

import { Link } from "react-router-dom";

export function User(props) {
    let user = props.user;
    return (
        <tr className="text-white">
          <td>
            <center>
                {user.login}
            </center>
          </td>
          <td>
              <center>
                {user.password}
              </center>
          </td>
        </tr>
      );
}

const backgroundStyle = {
    backgroundSize: "cover",
    backgroundImage: "url(assets/background.jpg)",
};

const containerStyle = {
    backdropFilter: "blur(4px)",
};

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {login: "admin", password: "helha"},
                {login: "secretaire", password: "secretariat"},
                {login: "nicolas", password: "nicolas"},
                {login: "guillaume", password: "guillaume"},
                {login: "sasha", password: "sasha"},
                {login: "mathieu", password: "mathieu"}
            ]
        }
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
                    <h1 className="text-white text-xl">Liste des utilisateurs inscrits</h1>

                    <div >
                        <div className="flex flex-col w-full p-3 gap-2">
                        <table className="border-2 shadow-2xl">
                            <thead>
                            <tr className="border-b-2 text-white text-l">
                                <th>Login</th>
                                <th>Mot de passe</th>
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
                    <Link to="/admin" className="text-helha_blue underline font-bold">
                        Revenir à la page de gestion d'utilisateurs
                    </Link>
                </div>
            </div>
        )
    }
}