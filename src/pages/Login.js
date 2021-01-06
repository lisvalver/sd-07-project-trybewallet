import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setEmail } from '../actions';

const Login = (props) => {
  const [loginOk, setLoginOk] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => { setLoginOk(!!(inputPassword.length >= 6 && inputEmail == 'alguem@email.com')); }, [inputPassword, inputEmail]);

  return (<div>
    <h1>Login</h1>
    <form>
      <label htmlFor="email">
        {' '}
        email
        <input
          value={ inputEmail }
          data-testid="email-input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={ (event) => setInputEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password">
        {' '}
        password
        <input
          value={ inputPassword }
          data-testid="password-input"
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          onChange={ (event) => setInputPassword(event.target.value) }
        />
      </label>
      {loginOk
        ? <button onClick={ () => props.setEmail(inputEmail) } type="button" enabled>Entrar</button>
        : <button type="button" disabled>Entrar</button>}
    </form>
    {props.stateEmail != '' && <Redirect to="/carteira" />}
  </div>);
};

const mapStateToProps = (state) => ({
  stateEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
