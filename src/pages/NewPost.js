import Component from "../library/Component";
import h from "../library/hyperscript";

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    labelText: 'ANTRAŠTĖ',
                    placeholder: 'Parduodu, o gal ir ieškau...',
                    name: 'title',
                }
            ],
            textArea: [
                {
                    labelText: 'SKELBIMAS',
                    placeholder: 'Kokia tavo žinia?',
                    name: 'body'
                }

            ],
            buttons: [
                {
                    name: 'register',
                    type: 'submit',
                    title: 'Skelbti'
                }
            ],
            newPost: {
                title: '',
                body: ''
            }
        }
    }

    newPost(e) {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        console.log(this.state.newPost);

        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            },
            method: 'POST',
            body: JSON.stringify(this.state.newPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    this.props.route('posts');
                }
            })
    }

    handleInput (name, value) {
        this.state.newPost[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        name: input.name,
                        class: 'antraste'
                    }
                ));
        });
        const textArea = this.state.textArea.map(text => {
            return h('label', {},
                text.labelText,
                h('textarea', {
                name: text.name,
                placeholder: text.placeholder,
                keyup: e => this.handleInput(text.name, e.target.value),
            }))
        })
        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name
                },
                button.title
            )
        });

        const form = h('form', {submit: (e) => {this.newPost(e)}}, ...inputs, ...textArea, ...buttons);
        return h('div', {}, form);
    }
}