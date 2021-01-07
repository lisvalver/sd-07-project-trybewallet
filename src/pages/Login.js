import React from 'react';
import { Header } from '../components';
import './Login.css';

const LoginForm = () => (
  <section>
    <div className="board">
      <form className="login">
        <input className="input" type="text" placeholder="Login" data-testid="email-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
        <input className="input" type="password" placeholder="Password" data-testid="password-input" />

        <input className="button" type="submit" value="Entrar" disabled />
      </form>
    </div>
  </section>
);

const Login = () => (
  <div className="App">
    <Header />
    <LoginForm />
  </div>
);

export default Login;
