import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.desableButton = this.desableButton.bind(this);
    this.state = {
      inputEmail: '',
      inputPass: '',
    };
  }

  desableButton(inputEmail, inputPass) {
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const tamanhoSenha = 6;
    if (regexEmail.test(inputEmail) && inputPass.length >= tamanhoSenha) {
      return false;
    } return true;
  }

  render() {
    const { saveUser, history } = this.props;
    const { inputEmail, inputPass } = this.state;
    return (
      <div id="login-box">
        <div className="inputLogin"><h1>Trybe Wallet</h1></div>
        <div className="inputLogin">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          className="inputLogin"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={ inputEmail }
          onChange={ (event) => this.setState({ inputEmail: event.target.value }) }
        />
        </div>
        <div className="inputLogin">
        <input
          type="password"
          data-testid="password-input"
          className="inputLogin"
          pattern=".{6,}"
          value={ inputPass }
          onChange={ (event) => this.setState({ inputPass: event.target.value }) }
        />
        </div>
        <button
          type="button"
          className="buttonLogin"
          disabled={ this.desableButton(inputEmail, inputPass) }
          onClick={ () => saveUser(inputEmail, inputPass) && history.push('/carteira') }
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

//vi o .test() no projeto do Tiago Esdra a ideia de usar uma função pra retornar bool no desable eu vi no projeto da Carolina Bezerra