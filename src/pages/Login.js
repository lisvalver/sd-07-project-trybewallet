import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { login } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  isEmailValid(email) {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // const format = /^\w+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(format)) return true;
    return false;
  }

  isPasswordValid(password) {
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH) return true;
    return false;
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      if (this.isEmailValid(email) && this.isPasswordValid(password)) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { signin, history } = this.props;
    return (
      <div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleInputChange }
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleInputChange }
          />
        </div>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => {
            signin({ email });
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signin: (value) => dispatch(login(value)),
});

export default connect(null, mapDispatchToProps)(Login);
