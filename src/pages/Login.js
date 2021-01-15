import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import userEmail from '../actions';

const Login = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [submit, setSubmit] = useState(true);
  const dispatch = useDispatch();

  const submitValidation = () => {
    const emailValidateRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordValidation = 6;
    const { email, password } = userInfo;
    if ((password.length >= passwordValidation) && (email.match(emailValidateRegex))) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setSubmit(submitValidation());
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(userEmail(userInfo.email));
    const { history } = props;
    history.push('/carteira');
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="inputEmail1">
            Seu email
            <input
              type="email"
              name="email"
              id="inputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              data-testid="email-input"
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">
            Sua senha
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Password"
              data-testid="password-input"
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <button
          type="button"
          disabled={ submit }
          onClick={ (event) => handleSubmit(event.target) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
