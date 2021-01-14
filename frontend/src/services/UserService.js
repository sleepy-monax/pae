import {ApiRegister} from "./ApiService";

export let MOCK_USERS = [
    {id:1, login: "admin", password: "helha", role:"Directeur"},
    {id:2, login: "secretaire", password: "secretariat", role:"Secretaire"},
    {id:3, login: "nicolas", password: "nicolas", role:"Secretaire"},
    {id:4, login: "guillaume", password: "guillaume", role:"Secretaire"},
    {id:5, login: "sasha", password: "sasha", role:"Secretaire"},
    {id:6, login: "mathieu", password: "mathieu", role:"Secretaire"},
];

export function FindAllUsers() {
    return MOCK_USERS;
}
  
export function FindUserById(id) {
    return MOCK_USERS.filter((user) => user.id === id)[0];
}

export function register(username, password, callback) {
    ApiRegister(username, password)
        .then((user) => {
            if (user.login === username) {
                callback({ success: true, message: "L'utilisateur a bien été ajouté" });
            }
            else {
                callback({ success: false, message: "L'utilisateur n'a pas pu être ajouté" });
            }
        })
}
