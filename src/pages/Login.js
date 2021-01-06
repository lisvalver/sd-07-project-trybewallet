import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionUserLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isValid: false,
      isClicked: false,
    };

    this.isInputValid = this.isInputValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isInputValid() {
    const { email, senha } = this.state;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const MIN_CHARACTERS_NUMBER = 6;
    if (regexEmail.test(String(email).toLowerCase())
    && senha.length >= MIN_CHARACTERS_NUMBER) {
      return this.setState({
        isValid: true,
      });
    }
    return this.setState({
      isValid: false,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState(
      {
        [name]: value,
      },
      this.isInputValid,
    );
  }

  render() {
    const { isValid, isClicked, email } = this.state;
    const { ActionUserLogin } = this.props;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="email"
          onChange={ this.handleChange }
          name="email"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="senha"
          onChange={ this.handleChange }
          name="senha"
        />
        <button
          disabled={ !isValid }
          onClick={ () => {
            ActionUserLogin(email);
            this.setState({ isClicked: true });
          } }
          type="button"
        >
          Entrar
        </button>
        {isClicked && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = { ActionUserLogin: actionUserLogin };

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  ActionUserLogin: PropTypes.func.isRequired,
};
