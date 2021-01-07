import React, { Component} from 'react';

export default class LoginBox extends Component {
  constructor () {
    super();
    this.state = {
      emailValid: false,
    };
  }
  
  componentDidUpdate(prevProps) {
    this.emailValidation(prevProps)
  }

  emailValidate(email) {
    const email_validate = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return email_validate.test(email);
  }

  emailValidation({ password: prevP, email: prevE }) {
    const { password, email } = this.props;
    if(prevE !== email || prevP !== password) {
      if (this.emailValidate(email) && password.length >= 6) {
        this.setState({ emailValid: true });
      }
      else if (!(this.props.emailValid)) {
        this.setState({ emailValid: false });
      }
    }
  }

  render () {
    const { getInputs, onSubmitBtn } = this.props;
    const { emailValid } = this.state;
    return (
      <div>
      <h3>Login</h3>
      <div>
        <label>
          Email:
          <input
            data-testid="email-input"
            type="email"
            onChange={getInputs}
          />
        </label>
        <label>
          Senha:
          <input
            data-testid="password-input"
            type="password"
            onChange={getInputs}
          />
        </label>
        {
          emailValid
          ? <button onClick={onSubmitBtn} >Entrar</button>
          : <button disabled >Entrar</button>
        }
      </div>
    </div>
    )
  }
}
