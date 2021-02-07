import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../actions/index';

const Login = () => {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  function toggleButton() {
    const disabledState = validEmail && validPassword;
    setDisabled(!disabledState);
  }

  function validateEmail(e) {
    const inputEmail = e.target.value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(inputEmail)) {
      setValidEmail(true);
      setEmail(inputEmail);
    } else {
      setValidEmail(false);
    }
    toggleButton();
  }

  function validatePassword(e) {
    const password = e.target.value;
    const minLength = 5;
    if (password.length >= minLength) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
    toggleButton();
  }

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          data-testid="email-input"
          onChange={ validateEmail }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="text"
          id="password"
          data-testid="password-input"
          onChange={ validatePassword }
        />
      </label>

      <Link to="/carteira">
        <button
          disabled={ isDisabled }
          type="button"
          onClick={ () => dispatch(addEmail(email)) }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
};

export default Login;
