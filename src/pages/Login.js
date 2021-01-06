import React from 'react';
import emailOk from '../helpers/emailValidation';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeEmail(event){
    this.setState({
      email: event.target.value
    });
  }

  handleChangePassword(event){
    this.setState({
      password: event.target.value
    });
  }

  render() {
  const { email, password } = this.state;
    return (
      <div className="pai">
        <header>Login</header> const { email, password } = this.state;
        <label htmlFor="email">
          E-mail:
          <input type="text" id="email" data-testid="email-input" onChange={ this.handleChangeEmail }/>
        </label>
        <label htmlFor="senha">
          Senha:
          <input type="password" id="senha" data-testid="password-input" onChange={ this.handleChangePassword } />
        </label>
        <button data-testid="password" type="button">Entrar</button>
      </div>
    );
  }
}
emailOk()
export default Login;
