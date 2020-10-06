import {loginFromToken} from "./login";
import h from "./library/hyperscript";
import Navigation from "./components/Navigation";
import Component from "./library/Component";

export default class Main extends Component{
    constructor() {
        super();
        this.login();
    }

    login() {
        this.state.isLoggedIn = loginFromToken();
    }

    render() {
        if (this.state.isLoggedIn) {
            return h('main', {}, h(Navigation, {showing: true}));
        } else {
            return h('main', {}, h(Navigation, {showing: true}));
            //jei butu prisiloginta, tai:
            // return hyperscript('form', {})
        }
    }
}
