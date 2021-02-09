import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actionCreators from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: false,
    };

    this.login = this.login.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login() {
    const { history, saveEmail } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    saveEmail(email);
  }

  isValid() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const passwordMinLength = 5;
    const { password, email } = this.state;
    let valid = true;
    if (valid && password.length < passwordMinLength) {
      valid = false;
    }
    if (valid && !email.match(regex)) {
      valid = false;
    }
    this.setState({ valid });
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value,
    });
    this.isValid();
  }

  render() {
    const { email } = this.props;
    const { password, valid } = this.state;
    return (
      <div>
        <div>Login</div>
        <input
          data-testid="email-input"
          value={ email }
          onChange={ (event) => this.handleChange(event, 'email') }
        />
        <input
          data-testid="password-input"
          value={ password }
          onChange={ (event) => this.handleChange(event, 'password') }
        />
        <button
          onClick={ this.login }
          disabled={ !valid }
          type="button"
        >
          Entrar
        </button>
        <h1>{email}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => {
    dispatch(actionCreators.saveEmail(email));
  },
});

Login.propTypes = {
  history: propTypes.string.isRequired,
  saveEmail: propTypes.func.isRequired,
  email: propTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
