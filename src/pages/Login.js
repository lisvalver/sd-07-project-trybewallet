import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.validatingPassword = this.validatingPassword.bind(this);
    this.validatingEmail = this.validatingEmail.bind(this);

    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,
    };
  }

  validatingPassword(password) {
    let validPassword = false;
    const minLength = 6;
    if (password.length >= minLength) {
      validPassword = true;
    }
    this.setState({
      validPassword,
    });
  }

  validatingEmail(email) {
    let validEmail = false;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase())) {
      validEmail = true;
    }
    this.setState({
      email,
      validEmail,
    });
  }

  render() {
    const { email, validEmail, validPassword } = this.state;
    const { validLogin } = this.props;
    return (
      <div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={ (event) => this.validatingEmail(event.target.value) }
            data-testid="email-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ (event) => this.validatingPassword(event.target.value) }
            data-testid="password-input"
          />
        </div>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ !(validEmail && validPassword) }
              onClick={ () => validLogin(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  validLogin: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = { validLogin: PropTypes.string.isRequired };
