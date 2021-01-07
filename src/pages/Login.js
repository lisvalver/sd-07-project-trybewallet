import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      passwordError: '',
    };
  }

  passwordChange(event) {
    // this.setState({
    //   password: event.target.value,
    //   passwordlength: event.target.value.length,
    // });

    const pwl = 6;

    if (event.target.value.length < pwl) {
      this.setState({
        passwordError: 'A senha tem que possuir mais de 6 caracteres',
      });
    } else {
      this.setState({
        passwordError: 'Senha OK',
      });
    }
  }

  emailChange(event) {
    const { email } = this.state;
    this.setState({
      email: event.target.value,
      emailError: 'Email OK',
    });
    if (email === '') {
      this.setState({
        emailError: 'Insira um email',
      });
    } else {
      const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/);
      if (!pattern.test(email)) {
        this.setState({
          emailError: 'Insira um email válido',
        });
      }
    }
  }

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <div>
        <input
          name="email"
          type="text"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.emailChange }
        />
        <input
          name="password"
          type="text"
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.passwordChange }
        />
        <button type="button">Entrar</button>
        <div>
          { emailError }
        </div>
        <div>
          { passwordError }
        </div>
      </div>
    );
  }
}

export default Login;
