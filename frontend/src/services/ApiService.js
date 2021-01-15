import axios from "axios";
import { getToken } from "./AuthenticationService";

let MOCK_API = process.env.REACT_APP_MOCK_API || false;
let API_URL = "http://localhost:8080/backend/api/";

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export let MOCK_USERS = [
    { id: "1", login: "admin", password: "helha", role: "Directeur" },
    {
        id: "2",
        login: "secretaire",
        password: "secretariat",
        role: "Secretaire",
    },
    { id: "3", login: "nicolas", password: "nicolas", role: "Secretaire" },
    { id: "4", login: "guillaume", password: "guillaume", role: "Secretaire" },
    { id: "5", login: "sasha", password: "sasha", role: "Secretaire" },
    { id: "6", login: "mathieu", password: "mathieu", role: "Secretaire" },
];

function ApiMockSucess(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 100);
    });
}

function ApiMockFailure(message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(message);
        }, 100);
    });
}

export function ApiAuthentication(login, password) {
    if (MOCK_API) {
        if ((login === "admin" || login === "user") && password === "helha") {
            return ApiMockSucess("stupid_auth_token");
        } else {
            return ApiMockFailure("Une erreur imaginaire ?!");
        }
    }

    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();

        params.append("login", login);
        params.append("password", password);

        axios
            .post(API_URL + "authentication", params, config)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Nom d'utilisateur ou mots de passe invalide!");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiUploadStudents(students) {
    console.log(students);
    if (MOCK_API) {
        localStorage.setItem("students", JSON.stringify(students));
        return ApiMockSucess();
    }

    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        const encodeToken = encodeURIComponent(getToken());

        params.append("students", JSON.stringify(students));

        axios
            .post(API_URL + "students?token=" + encodeToken, params, config)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Etudiants non ajouté");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiUploadSection(sections) {
    console.log(sections);
    if (MOCK_API) {
        localStorage.setItem("sections", JSON.stringify(sections));

        return ApiMockSucess();
    }

    return new Promise((resolve, reject) => {
        let params = new URLSearchParams();
        const encodeToken = encodeURIComponent(getToken());

        params.append("sections", JSON.stringify(sections));

        axios
            .post(API_URL + "sections?token=" + encodeToken, params, config)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Sections non ajouté");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiDownloadStudents() {
    if (MOCK_API) {
        return ApiMockSucess(JSON.parse(localStorage.getItem("students")));
    }

    return new Promise((resolve, reject) => {
        const encodeToken = encodeURIComponent(getToken());
        axios
            .get(API_URL + "students?token=" + encodeToken)
            .then((students) => {
                if (students.data !== null) {
                    resolve(students.data);
                } else {
                    reject("Students non importer");
                }
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

export function ApiDownloadSections() {
    if (MOCK_API) {
        return ApiMockSucess(JSON.parse(localStorage.getItem("sections")));
    }

    return new Promise((resolve, reject) => {
        const encodeToken = encodeURIComponent(getToken());
        axios
            .get(API_URL + "sections?token=" + encodeToken)
            .then((sections) => {
                console.log(sections);
                if (sections.data !== null) {
                    resolve(sections.data);
                } else {
                    reject("sections non importer");
                }
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}

export function ApiRegister(login, password) {
    if (MOCK_API) {
        let new_user = {
            id: MOCK_USERS.length + 1,
            login: "mathieu",
            password: "mathieu",
            role: "Secretaire",
        };

        MOCK_USERS.append(new_user);

        return ApiMockSucess(new_user);
    }

    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();

        params.append("login", login);
        params.append("password", password);

        const encodeToken = encodeURIComponent(getToken());

        axios
            .post(API_URL + "users?token=" + encodeToken, params, config)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Utilisateur non ajouté");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiFindUsers() {
    if (MOCK_API) {
        return ApiMockSucess(MOCK_USERS);
    }

    return new Promise((resolve, reject) => {
        const encodeToken = encodeURIComponent(getToken());

        axios
            .get(API_URL + "users?token=" + encodeToken)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Aucune donnée possible");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiFindUserById(id) {
    if (MOCK_API) {
        return ApiMockSucess(MOCK_USERS.filter((user) => user.id === id)[0]);
    }

    return new Promise((resolve, reject) => {
        const encodeToken = encodeURIComponent(getToken());

        axios
            .get(API_URL + "users/" + id + "?token=" + encodeToken)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Aucune donnée possible");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiUpdateUser(login, password, id) {
    if (MOCK_API) {
        let userIndex = MOCK_USERS.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return ApiMockFailure("Utilisateur non mis a jour");
        }

        MOCK_USERS[userIndex] = {
            id,
            login,
            password,
            role: MOCK_USERS[userIndex].role,
        };

        return ApiMockSucess();
    }

    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();

        params.append("id", id);
        params.append("login", login);
        params.append("password", password);

        const encodeToken = encodeURIComponent(getToken());

        axios
            .put(API_URL + "users?token=" + encodeToken, params, config)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Utilisateur non mis a jour");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function ApiDeleteUser(id) {
    if (MOCK_API) {
        MOCK_USERS = MOCK_USERS.filter((user) => user.id === id);
        return ApiMockSucess({ success: true });
    }

    return new Promise((resolve, reject) => {
        const encodeToken = encodeURIComponent(getToken());

        axios
            .delete(API_URL + "users/" + id + "?token=" + encodeToken)
            .then((result) => {
                if (result.data !== null) {
                    resolve(result.data);
                } else {
                    reject("Suppression non acceptée");
                }
            })
            .catch((reason) => {
                reject(reason);
            });
    });
}
