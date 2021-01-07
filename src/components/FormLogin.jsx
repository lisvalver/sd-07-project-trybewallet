import React, { Component } from 'react';

class FormLogin extends Component {
  render() {
    const { email, password, update } = this.props;
    return (
      <form>
        <fieldset>
          <legend>LOGIN</legend>
          <h1>Hello, TrybeWallet!</h1>
          <div>
            <label htmlFor='email'>E-mail:</label>
            <input
              data-testid='email-input'
              type='text'
              name='email'
              id='email'
              value={ email }
              onChange={ update }
            />
          </div>
          <div>
            <label htmlFor='password'>Senha:</label>
            <input
              data-testid='password-input'
              type='password'
              name='password'
              id='password'
              value={ password }
              onChange={ update }
            />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default FormLogin;
