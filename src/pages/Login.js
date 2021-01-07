import React from 'react';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      passwordlength: '',
    }
  }

  // handleChange = event => {
  //   const isCheckbox = event.target.type === "checkbox";
  //   this.setState({
  //     [event.target.name]: isCheckbox
  //       ? event.target.checked
  //       : event.target.value,
  //       passwordlength: this.state.email.length
  //   });
  // };

  passwordChange = event => {
    this.setState({
      password: event.target.value,
      passwordlength: event.target.value.length,
    })

    if (event.target.value.length < 6) {
      this.setState({
        passwordError: 'A senha tem que possuir mais de 6 caracteres'
      })
    } else {
      this.setState({
        passwordError: ''
      })
    }
  }

  emailChange = event => {
    this.setState({
      email: event.target.value,
      emailError: ''
    })
    if (this.state.email === '') {
      this.setState({
        emailError: 'Insira um email'
      })
    } else {
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(this.state.email)) {
        this.setState({
          emailError: 'Insira um email válido'
        })
      }
    }
  }

  // validate = () => {
  //   let passwordError = "";
  //   let emailError = "";

  //   if (this.state.password.length < 6) {
  //     passwordError = "name cannot be blank";
  //   }

  //   if (!this.state.email.includes("@")) {
  //     emailError = "invalid email";
  //   }

  //   if (emailError || passwordError) {
  //     this.setState({ emailError, passwordError });
  //     return false;
  //   }

  //   return true;
  // };

  render() {
    return (
      <div>
        <input name="email" type="text" placeholder="email" data-testid="email-input" onChange={this.emailChange} />
        <input name="password" type="text" placeholder="senha" data-testid="password-input" onChange={this.passwordChange}/>
        <button>Entrar</button>
        <div>
          {this.state.emailError}
        </div>
        <div>
          {this.state.passwordError}
        </div>
      </div>
    );
  }
}

export default Login;
