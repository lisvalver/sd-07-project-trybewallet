import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import loginAction from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      n: 6,
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  handlerInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submitUser(e) {
    e.preventDefault();
    const { email } = this.state;
    const { emailLogged, history } = this.props;
    emailLogged(email);
    history.push('/carteira');
  }

  validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
  }

  render() {
    const { email, senha, n } = this.state;

    return (
      <div>
        <p>Login</p>
        <form>
          <input
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/"
            onChange={ this.handlerInput }
            name="email"
            required="required"
            data-testid="email-input"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={ this.handlerInput }
            name="senha"
            required="required"
            data-testid="password-input"
            type="password"
            minLength="6"
            placeholder="Senha"
          />
          <button
            disabled={ this.validateEmail(email) && senha.length >= n ? '' : 'disabled' }
            onClick={ this.submitUser }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailLogged: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailLogged: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};
