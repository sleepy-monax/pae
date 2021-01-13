import axios from 'axios';

let API_URL = "http://localhost:8080/backend-0.0.1-SNAPSHOT/api/"

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export default function apiAuthentication(login, password) {
    const params = new URLSearchParams()
    params.append('login', login)
    params.append('password', password)
    return axios.post(API_URL + "authentication",
        params,
        config);
}