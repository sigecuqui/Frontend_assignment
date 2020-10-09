import Component from "../library/Component";
import h from "../library/hyperscript";
import {user} from "../login";
import Navigation from "../components/Navigation";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.postsFetch()
    }

    postsFetch() {

        const user = JSON.parse(localStorage.getItem('user'));

        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({posts: data});
                console.log(this.state);
            });

    }

    createPosts(name, value) {
        this.state.posts[name] = value;
    }

    render() {
        const allPosts = this.state.posts.map(post => {

            return h('div', {class: 'postsDiv'},
                h('h2', {}, post.title),
                h('h5', {}, post.created_at.split('T')[0]),
                h('p', {}, post.body),
                post.user_id === JSON.parse(localStorage.getItem('user')).id ?
                    h('button', {
                        class: 'delete-button',
                        click: () => this.deletePost(post.id)
                    }, 'Delete Post') : ''
            )
        });
        const postsDiv = h('div', {class: 'posts_container'}, ...allPosts);

        return h('div', {class: 'bodyDiv'}, postsDiv);
    }

    deletePost(id) {
        const user = JSON.parse(localStorage.getItem('user'))
        fetch('http://rest.stecenka.lt/api/skelbimai/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            },
            method: 'DELETE'
        }).then((data) => {
            const postsAll = this.state.posts.filter(post => post.id !== id);
            this.setState({posts: postsAll});
        });
    }
}

