import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buttonValidation() {
    const { email } = this.state;
    const { password } = this.state;
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    if ((password.length > 5) && (emailValidation)) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
    console.log("estou sendo chamada");
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  }

  handleSubmit() {
    const { login, history } = this.props;
    const email = this.state.email;
    login(email);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">Email
          <div>
            <input
              name="email"
              data-testid="email-input"
              placeholder="Digite seu email"
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          </label>{' '}
          <label htmlFor="password">Senha</label>{" "}
          <div>
            <input
              name="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              id="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" disabled={ this.state.disabled } onClick={this.handleSubmit}>Entrar</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: email,
// });

const mapDispatchToProps = {
  login: actions.changeEmail,
};

export default connect(null, mapDispatchToProps)(Login);
