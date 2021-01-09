import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.validateInfos = this.validateInfos.bind(this);
    this.click = this.click.bind(this);
    this.alterarEstado = this.alterarEstado.bind(this);
  }

  validateInfos() {
    const { email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const mincar = 6;
    return regex.test(email) && password.length >= mincar;
  }

  click() {
    const { loginDispatch, history } = this.props;
    const { email } = this.state;

    loginDispatch(email);
    history.push('/carteira');
  }

  alterarEstado({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        Login
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            name="email"
            type="email"
            placeholder="login"
            data-testid="email-input"
            onChange={ this.alterarEstado }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            data-testid="password-input"
            onChange={ this.alterarEstado }
            value={ password }
          />
        </label>
        <button type="button" disabled={ !this.validateInfos() } onClick={ this.click }>
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(login(email)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
