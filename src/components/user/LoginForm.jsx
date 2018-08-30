import React, {Component} from 'react';
import '../../style/forms.css';

import requester from '../../services/requester';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let userData = {
            'username': this.state.username,
            'password': this.state.password
        }
        requester.post('user', 'login', 'basic', userData)
            .then(res => {
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
            })
            .then(() => {
                this.props.handleLoginProp();
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <form className="form-marginator" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Login</legend>
                    <div className="form-group">
                        <label>User name:</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        );
    }
}