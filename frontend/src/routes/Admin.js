import {mdiAccountCircle, mdiAccountPlus, mdiChevronRight} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import {Link} from "react-router-dom";
import Header from "../components/Hearder";
import LinkButton from "../components/LinkButton";
import {FindAllUsers} from "../services/UserService";

export function User(props) {
    let user = props.user;
    return (
        <tr className="text-center bg-white dark:text-black">
            <td className="px-12 py-2">
                <Link to={"/user/" + user.id}>
                    {user.id}
                </Link>
            </td>
            <td className="px-12 py-2">
                <Link to={"/user/" + user.id}>
                    {user.login}
                </Link>
            </td>
            <td className="px-12 py-2">
                <Link to={"/user/" + user.id}>
                    {user.role}
                </Link>
            </td>
            <td className="py-2">
                <Link to={"/user/" + user.id}>
                    <div>
                        <Icon path={mdiChevronRight} size={2} />
                    </div>  
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
            <div className="flex-grow flex flex-col items-center dark:bg-helha_dark_grey">
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
                <div className="shadow rounded p-4 my-8 bg-white dark:bg-helha_grey max-w-4xl mx-auto flex flex-col gap-2 items-center">
                    <h2 className="text-xl">Veuillez sélectionner le compte à modifier</h2>

                    <div className="py-10 h-screen px-2">
                        <div className="flex flex-col w-full p-3 gap-2">
                            <table>
                                <thead>
                                <tr className="border-b-2">
                                    <th>Id</th>
                                    <th>Login</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody className="bg-gray-200">
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
