import React from 'react';
import { connect } from 'react-redux';
import login from '../actions'

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailValido: false,
      autentic: true,
    };

    this.validacaoEmail = this.validacaoEmail.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  validacaoEmail({ target }) {
    const { value } = target;
    this.setState({ email: value }, () => {
      const { email } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      if (matchEmail) {
        this.setState({ emailValido: true });
      } else {
        this.setState({ emailValido: false });
      }
    });
  }

  atualizarEmail() {
    const { login } = this.props;
    const { email } = this.state;
    login(email);
  }

  passwordValidation({ target }) {
    const { password, emailValido } = this.state;
    const noMagicNumber = 5;

    this.setState({ password: target.value });
    if (password.length >= noMagicNumber && emailValido === true) {
      this.setState({ autentic: false });
    } else { this.setState({ autentic: true }); }
  }

  render() {
    const { autentic } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.validacaoEmail(event) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => this.passwordValidation(event) }
          />
          <button
            type="button"
            disabled={ autentic }
            onClick = { () => this.atualizarEmail() } 
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

export default connect(null, mapDispatchToProps)(Login);
