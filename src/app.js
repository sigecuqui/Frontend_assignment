import './main.scss';
import {mount} from "./library/mount";
import Main from "./Main";
import h from "./library/hyperscript";
const root = document.getElementById('kibiras');

mount(h(Main), root);
