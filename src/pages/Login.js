import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  async handleChange(chave, valor) {
    await this.setState({
      [chave]: valor,
    });
    this.enableButton();
  }

  handleClick(path) {
    const { addUser } = this.props;
    const { email } = this.state;
    addUser(email);
    const { history } = this.props;
    history.push(path);
  }

  enableButton() {
    const validateEmail = this.validateEmail();
    const validatePassword = this.validatePassword();
    if (validateEmail === true && validatePassword === true) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail() {
    const regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const { email } = this.state;
    if (regex.test(String(email).toLowerCase()) === true) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword() {
    const { senha } = this.state;
    const minLength = 6;
    if (senha.length >= minLength) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <form>
          <input
            onChange={ (event) => this.handleChange('email', event.target.value) }
            type="email"
            data-testid="email-input"
            placeholder="e-mail"
          />
          <input
            onChange={ (event) => this.handleChange('senha', event.target.value) }
            type="password"
            data-testid="password-input"
            placeholder="senha"
          />
          <button
            id="enterButton"
            type="button"
            disabled={ this.enableButton() }
            onClick={ () => this.handleClick('/carteira') }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = { addUser };

export default connect(null, mapDispatchToProps)(withRouter(Login));
