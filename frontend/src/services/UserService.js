import {ApiFindUsers, ApiRegister, MOCK_USERS} from "./ApiService";

export function FindAllUsers(callback) {
    ApiFindUsers()
        .then((users) => {
            if (users !== null) {
                callback( {success: true, users: users});
            }
            else {
                callback( {success: false});
            }
        })
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
