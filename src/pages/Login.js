import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

const MIN_PASSWORD_LENGTH = 6;

function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email);
}

function passwordIsValid (password) {
  return password.length >= MIN_PASSWORD_LENGTH;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailValidation = emailIsValid(email);
    const passwordValidation = passwordIsValid(password);

    if (emailValidation && passwordValidation) {
      return false
    }
    return true;
  }

  handleEvent({target: {name, value}}) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveEmail, history } = this.props;
    saveEmail(this.state.email);

    history.push('/carteira');
  }
  render() {
    const {email, password} = this.state;
    return (
    <div>
      <form>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={email}
          onChange={this.handleEvent}
          placeholder="E-mail">
        </input>
        <input type="password" data-testid="password-input" placeholder="Senha"
        name="password"
        onChange={this.handleEvent}
        value={password}></input>
        <button disabled={this.inputValidation()} type="button" onClick={this.handleClick}>Entrar</button>
      </form>
    </div>
    );
  }
}

const mapDispatchToProps = {
  saveEmail: actions.saveEmail,
}

export default connect(null, mapDispatchToProps)(Login);
