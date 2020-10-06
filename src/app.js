import './main.scss';
import {mount} from "./library/mount";
import {loginForm} from "./components/loginForm";
import Main from "./Main";
import {loginFromToken} from "./login";
import h from "./library/hyperscript";
import Navigation from './components/Navigation'
const root = document.getElementById('kibiras');

mount(h(Main), root);

// **************************************************************************
// fetch("http://rest.stecenka.lt/register", {
//     headers: {
//         "Content-type": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({
//         name: "Sigita",
//         email: "baklazanas@email.com",
//         password: "asdfasdf"
//     }),
// })
//     .then(responseObject => responseObject.json())
//     .then(data => console.log(data));

