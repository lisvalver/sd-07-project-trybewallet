import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.clickButton = this.clickButton.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
  }

  clickButton() {
    const { loginAction, history } = this.props;
    const { email } = this.state;
    // mudar para a rota '/carteira'
    history.push('/carteira');
    // salvar o email no estado
    loginAction(email);
  }

  handleChangeEmail(event) {
    const { value } = event.target;
    this.setState({
      email: value,
    });
  }

  handleChangePassword(event) {
    const { value } = event.target;
    this.setState({
      password: value,
    });
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;

    return emailRe.test(email) && password.length >= passwordMinLength;
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Insira seu email"
            onChange={ (event) => this.handleChangeEmail(event) }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Insira sua senha"
            onChange={ (event) => this.handleChangePassword(event) }
          />
        </form>
        <button
          type="button"
          disabled={ !this.inputValidation() }
          onClick={ this.clickButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
