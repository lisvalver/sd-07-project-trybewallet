import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <div class="container">
          <div class="card card-container">
            <img
              id="profile-img"
              class="profile-img-card"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            />
            <form class="form-signin">
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="email"
                data-testid="email-input"
                required
                autofocus
              />
              <input
                type="password"
                id="senha"
                class="form-control"
                placeholder="Senha"
                data-testid="password-input"
                required
              />
              <div id="remember" class="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" /> Lembrar login?
                </label>
              </div>
              <button
                class="btn btn-lg btn-primary btn-block btn-signin"
                type="submit"
              >
                Entrar
              </button>
            </form>
            <Link href="#" class="forgot-password">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

// Caso logue
// Mudar o avatar
// <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" />
