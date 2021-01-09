import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../services/Logo';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };

    this.validate = this.validate.bind(this);
  }

  validate() {
    const passwordMin = 5;
    const { email, password } = this.state;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const emailIsValid = RegExp(pattern).test(email);
    const passwordIsValid = password.length >= passwordMin;
    let isValid = false;
    if (emailIsValid && passwordIsValid) isValid = true;
    this.setState({ isValid });
  }

  render() {
    const { email, password, isValid } = this.state;
    const { addEmail } = this.props;
    return (
      <form className="login-container">
        <div className="login-box">
          {Logo()}
          <h1>TrybeWallet</h1>
          <label htmlFor="email-input" className="login-inputs">
            <input
              value={ email }
              data-testid="email-input"
              type="email"
              placeholder="email@email.com"
              name="email-input"
              id="email-input"
              onChange={ (event) => {
                this.setState({ email: event.target.value });
                this.validate();
              } }
            />
          </label>
          <label htmlFor="password-input" className="login-inputs">
            <input
              value={ password }
              data-testid="password-input"
              type="password"
              placeholder="password"
              name="password-input"
              minLength="6"
              onChange={ (event) => {
                this.setState({ password: event.target.value });
                this.validate();
              } }
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              onClick={ () => addEmail(email) }
              disabled={ !isValid }
            >
              Entrar
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
