import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      validEmail: false,
      password: false,
      disable: true,
      toWallet: false,
    };
  }

  checkEmail({ target }) {
    const { value, validity } = target;
    const { password } = this.state;
    this.setState({
      email: value,
      validEmail: validity.valid,
    });
    if (validity.valid && password === true) {
      this.setState({ disable: false });
    } else this.setState({ disable: true });
  }

  checkPassword({ target }) {
    const { name, validity } = target;
    const { validEmail } = this.state;
    this.setState({ [name]: validity.valid });
    if (validity.valid && validEmail === true) {
      this.setState({ disable: false });
    } else this.setState({ disable: true });
  }

  login() {
    const { email } = this.state;
    const { loginEmail } = this.props;
    loginEmail(email);
    this.setState({ toWallet: true });
  }

  render() {
    const { toWallet, disable } = this.state;
    if (toWallet) return (<Redirect to="/carteira" />);
    return (
      <div>
        <header>Login</header>
        <div className="Form">
          <fieldset>
            <div className="Login">
              <div className="email">
                <label htmlFor="email">
                  E-mail:
                  <input
                    name="email"
                    type="email"
                    onChange={ this.checkEmail }
                    data-testid="email-input"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                    required="required"
                  />
                </label>
              </div>
              <div className="password">
                <label htmlFor="password">
                  Password:
                  <input
                    name="password"
                    type="password"
                    onChange={ this.checkPassword }
                    data-testid="password-input"
                    pattern="[a-z0-9._%+-]{6,}"
                    required="required"
                  />
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="login-button">
          <button
            type="button"
            disabled={ disable }
            onClick={ this.login }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (string) => dispatch(login(string)) });

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  loginEmail: propTypes.func.isRequired,
};
