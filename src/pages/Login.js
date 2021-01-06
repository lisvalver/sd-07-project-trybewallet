import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailValid: false,
      passValid: false,
      email: '',
    }
  }

  validateEmail = (email) => {
    const emailRegex = /^\w+[\W_]?\w*@[a-z]+.com(?:.br)?$/;

    return emailRegex.test(email);
  }

  allowEmail = ({ target: { value } }) => {
    const emailValid = this.validateEmail(value);

    this.setState({
      emailValid,
      email: value
    })
  }

  validatePassword = (password) => {
    const passRegex = /^[\Wa-zA-z]{6,}$/
    console.log(passRegex.test(password));

    return passRegex.test(password);
  }

  allowPassword = ({ target: { value } }) => {
    const passValid = this.validatePassword(value);

    this.setState({
      passValid,
    })
  }

  render() {
    const { emailValid, passValid, email } = this.state;
    const { sendEmail } = this.props;

    return (
      <article>
        <section>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            testid="email-input"
            onChange={this.allowEmail}
            required
          />
        </section>
        <section>
          <label htmlFor="password-input">Senha</label>
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            onChange={this.allowPassword}
            required
          />
        </section>
        <button
          onClick={() => sendEmail(email)}
          disabled={!(emailValid && passValid)}
        >
          Entrar
        </button>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendEmail: email => dispatch(sendEmail(email))
})

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};
