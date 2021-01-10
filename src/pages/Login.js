import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.validateInfos = this.validateInfos.bind(this);
    this.click = this.click.bind(this);
  }

  validateInfos() {
    const { email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minLength = 6;
    return regex.test(email) && password.length >= minLength;
  }

  click() {
    const { loginDispatch, history } = this.props;
    const { email } = this.state;
    loginDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Login"
              data-testid="email-input"
              onChange={ (event) => this.setState({ email: event.target.value }) }
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
              onChange={ (event) => this.setState({ password: event.target.value }) }
              value={ password }
            />
          </label>
          <button
            type="submit"
            disabled={ !this.validateInfos() }
            onClick={ () => this.click() }
          >
            Entrar
          </button>
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(emailUser(email)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
