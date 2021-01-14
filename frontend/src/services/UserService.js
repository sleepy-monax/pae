import {ApiFindUsers, ApiRegister, ApiUpdateUser, ApiFindUserById, ApiDeleter} from "./ApiService";

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
  
export function FindUserById(id, callback) {
    ApiFindUserById(id)
        .then((user) => {
           if (user !== null) {
                callback({success: true, user: user})
           }
           else {
                callback({success: false})
           }
        });
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

export function update(username, password, id, callback) {
    ApiUpdateUser(username, password, id)
        .then((user) => {
            if (user.login === username) {
                callback({ success: true, message: "L'utilisateur a bien été mis à jour" });
            }
            else {
                callback({ success: false, message: "L'utilisateur n'a pas pu être mis à jour" });
            }
        });
    }

export function deleter(id, callback) {
    ApiDeleter(id)
        .then(user => {
            if (user !== null) {
                callback({ success: true, message: "L'utilisateur a bien été supprimé" });
            }
            else {
                callback({ success: false, message: "L'utilisateur n'a pas été supprimé" });
            }
        })
}
