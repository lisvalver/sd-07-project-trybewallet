import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      inputEmail: '',
      inputPass: '',
      disabled: true,
    };
  }

  buttonClick(inputEmail, inputPass) {
    const { saveUser, history } = this.props;
    saveUser(inputEmail, inputPass);
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const tamanhoSenha = 6;
    if (regexEmail.test(email) && inputPass.length < tamanhoSenha) {
      this.setState({ disabled: false });
    } return history.push('/carteira');
  }

  render() {
    const { inputEmail, inputPass, disabled } = this.state;
    return (
      <div id="login-box">
        <h1>Trybe Wallet</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          className="inputLogin"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={ inputEmail }
          onChange={ (event) => this.setState({ inputEmail: event.target.value }) }
        />
        <input
          type="password"
          data-testid="password-input"
          className="inputLogin"
          pattern=".{6,}"
          value={ inputPass }
          onChange={ (event) => this.setState({ inputPass: event.target.value }) }
        />
        <button
          type="button"
          className="buttonLogin"
          disabled={ disabled }
          onClick={ () => { buttonClick(inputEmail, inputPass); } }
        >
          Entrar
        </button>
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (email, password) => dispatch(addUser(email, password)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUser: PropTypes.shape({
    type: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
