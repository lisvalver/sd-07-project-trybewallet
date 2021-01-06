import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.loginAndRedirect = this.loginAndRedirect.bind(this);
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  handleChangeInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateInput();
  }

  validateInput() {
    const { emailInput, passwordInput } = this.state;
    const maxChar = 6;
    const button = document.querySelector('#submit-button');
    const regex = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    if (regex.test(emailInput) && passwordInput.length >= maxChar) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  loginAndRedirect(e) {
    e.preventDefault();
    console.log('redirecionando...');
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Insira seu email"
          name="emailInput"
          value={ emailInput }
          onChange={ (e) => this.handleChangeInput(e) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Insira sua senha"
          name="passwordInput"
          value={ passwordInput }
          onChange={ (e) => this.handleChangeInput(e) }
        />
        <button
          id="submit-button"
          type="submit"
          onClick={ (e) => this.loginAndRedirect(e) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
