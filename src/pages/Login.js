import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

 handleLogin(){
  const { email, senha } = this.state;
  if ( email === 'strongreen@strongreen.com' && senha === 'strongreen') {
    //  /carteira
  }
  else {
    // Desativa o botão
  }
 }

 onInputChange({ target }){
  const { name, value} = target;

 }


  render() {
    return (
      <div>
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="avatar"
        />
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            data-testid="password-input"
            required
          />
          <div id="remember">
            <label htmlFor="lembrar">
              <input type="checkbox" id="lembrar" value="remember-me" />
              Lembrar login?
            </label>
          </div>
          <button type="submit" onClick={this.handleLogin}>Entrar</button>
        </form>
        <Link to="/">Esqueceu a senha?</Link>
      </div>
    );
  }
}

export default Login;
