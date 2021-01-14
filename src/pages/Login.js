import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
import './Login.css';

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
      <div className="body">
        <form className="formulario">
          <label
            htmlFor="email"
            className="input"
          >
            E-mail
            <input
              className="caixa"
              id="email"
              data-testid="email-input"
              type="email"
              onChange={ this.handleChange }
              placeholder="email"
              name="email"
            />
          </label>
          <label htmlFor="password" className="senha">
            Senha
            <input
              className="caixa"
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="password"
              onChange={ this.handleChange }
              name="password"
            />
          </label>
          <button
            className="button"
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

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
