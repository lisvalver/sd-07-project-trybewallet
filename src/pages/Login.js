import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clientAction } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minlength = 5;
    if (email.match(regex) && password.length >= minlength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    this.validate();
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { sendEmail } = this.props;
    return (
      <div>
        <div className="div-login">
          <img url="" alt="Logo Trybe" />
          <input
            data-testid="email-input"
            className="input-email"
            placeholder="alguem@email.com"
            type="email"
            name="email"
            value={ email }
            onChange={ (event) => this.handleChange(event) }
          />
          <br />

          <input
            data-testid="password-input"
            className="input-password"
            placeholder="password"
            type="password"
            name="password"
            value={ password }
            onChange={ (event) => this.handleChange(event) }
          />

          <br />
          <Link to="/carteira">

            <button
              disabled={ isDisabled }
              type="button"
              className="button-login"
              onClick={ () => sendEmail(email) }
            >
              Entrar
            </button>
          </Link>

        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(clientAction(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispathToProps)(Login);
