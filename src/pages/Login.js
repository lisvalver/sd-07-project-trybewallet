import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPass: '',
    };
  }

  render() {
    const { saveUser, history } = this.props;
    const { inputEmail, inputPass } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Insira seu e-mail"
          className="inputLogin"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
          onClick={ () => {
            saveUser(inputEmail, inputPass);
            history.push('/carteira');
          } }
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
