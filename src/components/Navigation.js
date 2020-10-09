import Component from "../library/Component";
import h from "../library/hyperscript";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const posts = h('h2', {class: 'posts'}, 'POSTS');
        const newPost = h('h2', {class: 'new-post'}, 'NEW');
        const logout = h('h2', {class: 'logout'}, 'LOGOUT');

        const postsLog = h('i', {class: "fas fa-book"});
        const newPostLog = h('i', {class: "far fa-edit"});
        const logoutLog = h('i', {class: "fas fa-sign-out-alt"});
        return h('nav', {class: "navigation"},
            h('a', {
                click: () => this.props.route('posts')
            }, postsLog, posts),
            h('a', {
                click: () => this.props.route('newPost')
            }, newPostLog, newPost),
            h('a', {
                click: () => {
                    this.props.exit();
                    localStorage.removeItem('user');
                    this.props.exit(false);
                }
            }, logoutLog, logout)
        )
    }
}