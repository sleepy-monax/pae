import axios from "axios";
import {getToken} from "./AuthenticationService";

let MOCK_API = process.env.REACT_APP_MOCK_API || false;
let API_URL = "http://localhost:8080/backend-0.0.1-SNAPSHOT/api/";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

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
  console.log(process.env);

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

export function ApiRegister(login, password) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();

    params.append("login", login);
    params.append("password", password);


    const encodeToken = encodeURIComponent(getToken());

    axios
        .post(API_URL + "users?token="+ encodeToken, params, config)
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
