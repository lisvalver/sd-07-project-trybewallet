import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions';

class Login extends React.Component {
  constructor () {
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

    validacaoEmail ({ target }) {
      const { value } = target;
      this.setState({ email: value }, () => {
      const { email } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      if (matchEmail) {
        this.setState({ emailValido: true });
      } else{
          this.setState({ emailValido: false });
        }
    });
  }

  passwordValidation ({ target }) {
    this.setState({ password: target.value });
    if (this.state.password.length >= 6 && this.state.emailValido == true) { this.setState({ autentic: false }); }
    else { this.setState({ autentic: true }); }
  } 

  render() {
    console.log(this.props)
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
            disabled={ this.state.autentic }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

/*
const mapDispatchToProps = {
  login(user);
}
*/

export default connect(mapStateToProps)(Login);
