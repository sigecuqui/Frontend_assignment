import Component from "../library/Component";
import h from "../library/hyperscript";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    labelText: 'El. paštas',
                    placeholder: 'El. paštas',
                    type: 'email',
                    name: 'email',
                },
                {
                    labelText: 'Slaptažodis',
                    placeholder: 'Slaptažodis',
                    type: 'password',
                    name: 'password',
                }
            ],
            buttons: [
                {
                    name: 'register',
                    type: 'submit',
                    title: 'Prisijungti'
                }
            ],
            credentials: {
                email: '',
                password: ''
            }
        }
    }

    login(e) {
        e.preventDefault();
        console.log(e);

        fetch('http://rest.stecenka.lt/login', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(user => {
                if(user) {
                    console.log(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    this.props.login(user);
                }
            });
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        type: input.type,
                        name: input.name
                    }
                ));
        });
        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name
                },
                button.title
            )
        });

        const icon = h('i', {class: "fas fa-cloud"});
        const question = h('h3', {}, 'Pirmas kartas?');
        const addUser = h('i', {
            class: "fas fa-hands",
            click: () => this.props.route('register')
        });
        const form = h('form', {submit: (e) => this.login(e)}, icon, ...inputs, ...buttons, question, addUser);
        return h('div', {}, form);
    }
}