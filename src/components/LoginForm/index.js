import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    const { formData, onInputChange, onSubmit, buttonIsAble } = this.props;
    const { email, password } = formData;
    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your E-mail"
          value={ email }
          onChange={ (event) => onInputChange(event) }
        />
        <input
          data-testid="password-input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={ password }
          onChange={ (event) => onInputChange(event) }
        />
        <button type="button" onClick={ onSubmit } disabled={ buttonIsAble }>
          Entrar
        </button>
      </form>
    );
  }
}
