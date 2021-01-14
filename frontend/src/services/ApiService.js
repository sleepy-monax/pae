import axios from "axios";
import { getToken } from "./AuthenticationService";

let MOCK_API = process.env.REACT_APP_MOCK_API || false;
let API_URL = "http://localhost:8080/backend-0.0.1-SNAPSHOT/api/";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export let MOCK_USERS = [
  {id:"1", login: "admin", password: "helha", role:"Directeur"},
  {id:"2", login: "secretaire", password: "secretariat", role:"Secretaire"},
  {id:"3", login: "nicolas", password: "nicolas", role:"Secretaire"},
  {id:"4", login: "guillaume", password: "guillaume", role:"Secretaire"},
  {id:"5", login: "sasha", password: "sasha", role:"Secretaire"},
  {id:"6", login: "mathieu", password: "mathieu", role:"Secretaire"},
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
      return ApiMockFailure("Un erreur imaginaire ?!");
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
  if (MOCK_API) {
    localStorage.setItem("students", JSON.stringify(students));

    return ApiMockSucess();
  }
}

export function ApiUploadSection(sections) {
  if (MOCK_API) {
    localStorage.setItem("sections", JSON.stringify(sections));

    return ApiMockSucess();
  }
}

export function ApiDownloadStudents(students) {
  if (MOCK_API) {
    return ApiMockSucess(JSON.parse(localStorage.getItem("students")));
  }
}

export function ApiDownloadSection(sections) {
  if (MOCK_API) {
    return ApiMockSucess(JSON.parse(localStorage.getItem("sections")));
  }
}

export function ApiRegister(login, password) {
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
            resolve(result.data)
          }
          else {
            reject("Aucune donnée possible")
          }
        })
        .catch((e) => {
          reject(e);
        });
  });
}
