import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import emailUser from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.verificationEmail = this.verificationEmail.bind(this);
    this.verificationPassword = this.verificationPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonHabil: false,
    };
  }

  verificationEmail() {
    const { email } = this.state;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return regex.test(email);
  }

  verificationPassword() {
    const { password } = this.state;
    const min = 6;
    if (password.length >= min) {
      return true;
    }
    return false;
  }

  routeChange(event) {
    const { email } = this.state;
    event.preventDefault();
    const { history, emailSend } = this.props;
    emailSend(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      let isDisable = false;
      if (this.verificationEmail() && this.verificationPassword()) {
        isDisable = true;
      }

      this.setState({
        buttonHabil: isDisable,
      });
    });
  }

  render() {
    const { email, password, buttonHabil } = this.state;
    return (
      <div>
        Login
        <form id="form">
          <input
            type="text"
            id="email"
            value={ email }
            data-testid="email-input"
            placeholder="Digite seu email"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            value={ password }
            name="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            min="6"
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.routeChange }
            disabled={ !buttonHabil }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({

  emailSend: (email) => dispatch(emailUser(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  emailSend: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
