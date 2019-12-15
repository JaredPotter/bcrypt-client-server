import React from 'react';
import bcryptjs from 'bcryptjs';

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: 'myUsername',
            password: 'myPassword',
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin() {
        const password = this.state.password;

        // Encrypt Password:
        const hashedPassword = await bcryptjs.hash(password, 10);
        debugger;
        const payload = {
            username: this.state.username,
            password: hashedPassword,
        };
        const baseUrl = 'http://localhost:3010'; // TODO: pull this in.

        fetch(`${baseUrl}/login`, { method: 'POST' })
            .then((response) => {

                debugger;
            })
            .catch((error) => {
                debugger;
            })
    }

    render() {
        return (
            <div className="login-container">
                <label>Username*: 
                    <input 
                        type="text" 
                        value={ this.state.username }
                        onChange={ (e) => this.setState({ username: e.target.value }) }
                    />
                </label>
                <label>Password*: 
                <input 
                        type="passowrd" 
                        value={ this.state.password }
                        onChange={ (e) => this.setState({ password: e.target.value }) }
                    />
                </label>
                <button onClick={ this.handleLogin}>Login</button>
            </div>
        );
    }
}

export default Login;