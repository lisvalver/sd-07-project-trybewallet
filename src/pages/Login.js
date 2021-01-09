import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.click = this.click.bind(this);
  }

  emailIsValid() {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validate = regex.test(email);
    const minLength = 6;
    const validatePassword = password.length >= minLength;

    if (validate && validatePassword) {
      return true;
    }
    return false;
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }
  // Nicholas Torres J. Vasconcelos

  click() {
    const { loginDispatch, history } = this.props;
    const { email } = this.state;

    loginDispatch(email);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">
            Login
            <input
              id="email"
              data-testid="email-input"
              type="email"
              onChange={ this.handleChange }
              placeholder="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="password"
              onChange={ this.handleChange }
              name="password"
            />
          </label>
          <button
            type="submit"
            disabled={ !this.emailIsValid() }
            onClick={ this.click }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
