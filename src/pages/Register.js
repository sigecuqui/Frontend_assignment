import Component from "../library/Component";
import h from "../library/hyperscript";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    labelText: 'Vardas',
                    placeholder: 'Vardas',
                    type: 'text',
                    name: 'name'
                },
                {
                    labelText: 'Pavardė',
                    placeholder: 'Pavardė',
                    type: 'text',
                    name: 'surname'
                },
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
                    title: 'Registruotis'
                }
            ],
            credentials: {}
        }
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    register(e) {
        e.preventDefault();

        fetch('http://rest.stecenka.lt/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    this.props.route('login');
                }
            });

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
                    name: button.name,
                },
                button.title
            )
        })
        const icon = h('i', {class: "fas fa-cloud"});
        const question = h('h3', {}, 'Užsiregistravęs?');
        const addUser = h('i', {class: "fas fa-hands", click: () => this.props.route('login')});
        const form = h('form', {submit: (e) => this.register(e)}, icon, ...inputs, ...buttons, question, addUser);
        return h('div', {}, form);
    }
}