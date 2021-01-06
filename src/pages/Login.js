import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }
  render() {

    function buttonClick() {
      const email = document.getElementsByClassName("email")[0].value;
      this.setState({
        email: email,
      })
      this.props.history.push("/carteira")
    }
    return <div>
      Login
      <label htmlFor="email">Email</label>
      <input className="email" data-testid="email-input" type="email" name="email" />
      <label htmlFor="password">Senha</label>
      <input className="password" data-testid="password-input" minlength="6" type="password" name="password" />
      <button onClick={() => buttonClick()}>Entrar</button>
    </div>;
  }
}


export default Login;
