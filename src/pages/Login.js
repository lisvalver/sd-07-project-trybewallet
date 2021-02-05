import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../actions';
import logo from '../images/social-blockchain.jpg';
// import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputValidation = this.inputValidation.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { updateEmail, history } = this.props;
    const { email } = this.state;
    updateEmail(email);
    history.push('/carteira');
  }

  inputValidation() {
    const { email, password } = this.state;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    return emailRe.test(email) && password.length >= passwordMinLength;
  }

  render() {
    return (
      <div className="background-image">
        <div className="input-group">
          <div className="title-container">
            <div>
              <img className="logo-image" src={ logo } alt="logo" />
            </div>
          </div>
          <div className="login-container">
            <div className="form-group">
              Login to your account:
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="E-mail"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success btn-md btn-block"
                data-testid="login-submit-btn"
                disabled={ !this.inputValidation() }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateEmail: (email) => dispatch(sendEmail(email)),
});

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
