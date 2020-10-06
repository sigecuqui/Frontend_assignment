import h from "../library/hyperscript";
import {createNode} from "../library/createNode";
import Component from "../library/Component";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationLinks: [
                'Home',
                'Login',
                'Register'
            ],
            isActive: false
        };
    }

    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.updateComponent()
    }

    activate() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    updateComponent() {
        const vNode = this.render();
        const element = createNode(vNode)
        createNode(vNode);
        this.element.replaceWith(element);
        this.element = element;
    }

    render() {
        const burgerLine1 = h('div', {class: 'line'});
        const burgerLine2 = h('div', {class: 'line2'});
        const burgerLine3 = h('div', {class: 'line3'});
        const burger = h('div', {
            class: 'top__burger',
            click: () => this.activate()
        }, burgerLine1, burgerLine2, burgerLine3);

        const links = this.state.navigationLinks.map(link => {
            return h('li', {}, h('a', {href: `/${link}`}, link));
        });
        const ul = h('ul', {}, ...links);

        return h('nav', {}, this.state.isActive ? ul : '', burger);
    }
}

// const navigationLinks = [
//     {
//         href: '/home',
//         title: 'Home',
//         authorized: true
//     },
//     {
//         href: '/login',
//         title: 'Login',
//         authorized: false
//     },
//     {
//         href: '/register',
//         title: 'Register',
//         authorized: false
//     }
// ]