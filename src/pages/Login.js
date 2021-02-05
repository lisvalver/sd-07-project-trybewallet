import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  validEmail() {
    const { email } = this.state;
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {
      return true;
    }
    return false;
  }

  validPassword() {
    const { password } = this.state;
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH) return true;
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => {
      if (this.validEmail() && this.validPassword()) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { history, upEmail } = this.props;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            className="form-control"
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <p>
          Nós nunca iremos compartilhar seu e-mail com ninguém.
        </p>
        <label htmlFor="password">
          Senha
          <input
            className="form-control"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleInput }
          />
        </label>
        <button
          disabled={ disabled }
          onClick={ () => {
            upEmail(email);
            history.push('/carteira');
          } }
          className="btn btn-success"
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  upEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  upEmail: (value) => dispatch(addUserEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);
