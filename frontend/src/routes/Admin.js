import {mdiAccountCircle, mdiAccountPlus} from "@mdi/js";
import React from "react";
import {Link} from "react-router-dom";
import Header from "../components/Hearder";
import LinkButton from "../components/LinkButton";
import {FindAllUsers} from "../services/UserService";

export function User(props) {
    let user = props.user;
    return (
        <tr className="text-center">
            <td>
                <Link to={"/user/" + user.id}>
                    {user.id}
                </Link>
            </td>
            <td>
                <Link to={"/user/" + user.id}>
                    {user.login}
                </Link>
            </td>
            <td>
                <Link to={"/user/" + user.id}>
                    {user.role}
                </Link>
            </td>
        </tr>
    );
}

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: "admin",
            users: []
        };


    }

    componentDidMount() {
        FindAllUsers(
            function (result) {
                if (result.success) {
                    this.setState({ users: result.users });
                } else {
                    //A FAIRE
                }
            }.bind(this)
        );
    }

    render() {
        return (
            <div className="flex-grow flex flex-col items-center">
                <Header
                    icon={mdiAccountCircle}
                    title="Administration"
                    description="Modification des utilisateurs"
                >
                    <LinkButton
                        icon={mdiAccountPlus}
                        to="/register"
                        text="Créer un compte"
                        className="px-3"
                    />
                </Header>
                <div className="my-0 p-8 flex flex-col flex-grow items-center gap-4 max-w-2xl">
                    <h2 className="text-l">Veuillez sélectionner le compte à modifier</h2>

                    <div className="py-20 h-screen px-2">
                        <div className="flex flex-col w-full p-3 gap-2">
                            <table
                                className="border-2 shadow-2xl"
                            >
                                <thead >
                                <tr className="border-b-2 ">
                                    <th>Id</th>
                                    <th>Login</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map((user, index) => (
                                    <User key={user.id} user={user}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
