import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import changeUser from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.loginAndRedirect = this.loginAndRedirect.bind(this);
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  handleChangeInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateInput();
  }

  validateInput() {
    const { emailInput, passwordInput } = this.state;
    const maxChar = 5;
    const button = document.querySelector('#submit-button');
    const regex = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    if (regex.test(emailInput) && passwordInput.length >= maxChar) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  loginAndRedirect(e) {
    const { updateUser } = this.props;
    const { emailInput } = this.state;
    e.preventDefault();
    console.log('redirecionando...');
    updateUser(emailInput);
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Insira seu email"
          name="emailInput"
          value={ emailInput }
          onChange={ (e) => this.handleChangeInput(e) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Insira sua senha"
          name="passwordInput"
          value={ passwordInput }
          onChange={ (e) => this.handleChangeInput(e) }
        />
        <button
          id="submit-button"
          type="submit"
          onClick={ (e) => this.loginAndRedirect(e) }
          disabled
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (value) => dispatch(changeUser(value)),
});

Login.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
