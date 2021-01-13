import { mdiAccountCircle } from "@mdi/js";
import { useParams } from "react-router-dom"
import Header from "../components/Hearder";
import { FindUserById } from "../services/UserService";

export default function User() 
{
    let { userId } = useParams();
    console.log("User Id: "  + userId);
    let user = FindUserById(userId);
    console.log("User : " + user);

    return (
        <div className="bg-gray-100 dark:bg-helha_dark_grey flex-1">
            <Header
                icon={mdiAccountCircle}
                title={user.login + " " + user.password}
                description={user.id + " · " + user.role}
            />
        </div>
    )
}