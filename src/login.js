import {loginForm} from "./components/loginForm";
import {createNode} from "./library/createNode";


export function login() {

}

export function loginFromToken() {
    let token = localStorage.getItem('token');

    if (token) {
        user.token = 'Bearer ' + token;
        return true;
    }
    return false;
}

export const user = {
    token: ''
};
