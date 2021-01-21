import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validEmail: false,
      validPassword: false,
      isDisabled: true,
      email: '',
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  validateEmail(e) {
    const email = e.target.value;

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(email)) {
      this.setState({
        validEmail: true,
        email,
      }, this.toggleButton);
    } else {
      this.setState({
        validEmail: false,
      }, this.toggleButton);
    }
  }

  validatePassword(e) {
    const password = e.target.value;
    const minLength = 6;
    if (password.length >= minLength) {
      this.setState({
        validPassword: true,
      }, this.toggleButton);
    } else {
      this.setState({
        validPassword: false,
      }, this.toggleButton);
    }
  }

  toggleButton() {
    const { validEmail, validPassword } = this.state;
    const disabledState = validEmail && validPassword;
    this.setState({
      isDisabled: !disabledState,
    });
  }

  render() {
    const { isDisabled } = this.state;
    const { addEmailAction } = this.props;
    const { email } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            data-testid="email-input"
            onChange={ this.validateEmail }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="text"
            id="password"
            data-testid="password-input"
            onChange={ this.validatePassword }
          />
        </label>

        <Link to="/carteira">
          <button
            disabled={ isDisabled }
            type="button"
            onClick={ () => addEmailAction(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  addEmailAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmailAction: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
