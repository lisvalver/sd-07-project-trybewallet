/* import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
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
      toWallet: false
    }
  }

  checkEmail({ target }) {
    const { value, validity } = target;
    this.setState({
      email: value,
      validEmail: validity.valid
    });
    if (validity.valid && this.state.password === true) {
      this.setState({ disable: false });
    } else this.setState({ disable: true });
  }

  checkPassword({ target }) {
    const { name, validity } = target;
    this.setState({ [name]: validity.valid });
    if (validity.valid && this.state.validEmail === true) {
      this.setState({ disable: false });
    } else this.setState({ disable: true });
  }

  login() {
    this.props.email(this.state.email);
    this.setState({ toWallet: true })
  }

  render() {
    if (this.state.toWallet) return (<Redirect to="/carteira" />);
    return (
      <div>
        <header>Login</header>
        <div className="Form">
          <fieldset>
            <div className="Login">
              <div className="email">
                <label htmlFor="email" />
                E-mail:
                <input
                  name="email"
                  type="email"
                  onChange={ this.checkEmail }
                  data-testid="email-input"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                  required="required"
                />
              </div>
              <div className="password">
                <label htmlFor="password" />
                Password:
                <input
                  name="password"
                  type="password"
                  onChange={ this.checkPassword }
                  data-testid="password-input"
                  minLength="6"
                  required="required"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="login-button">
          <button
            type="button"
            disabled={ this.state.disable }
            onClick={ this.login }
          >Entrar</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (string) => dispatch(login(string))});

export default connect(null, mapDispatchToProps)(Login); */
