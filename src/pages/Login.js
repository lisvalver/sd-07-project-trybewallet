import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmail, upDateCurrencies } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isEmailIsPassword = this.isEmailIsPassword.bind(this);
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  isEmailIsPassword() {
    const { email, password } = this.state;
    const numberToComper = 6;

    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isValid = re.test(email);

    return !(isValid && password.length >= numberToComper);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.setState({ isButtonDisabled: this.isEmailIsPassword() });
    });
  }

  render() {
    const { isButtonDisabled, email } = this.state;
    const { dispatchSaveEmail } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          onChange={ this.handleInputChange }
          name="email"
          type="email"
        />
        <input
          data-testid="password-input"
          onChange={ this.handleInputChange }
          name="password"
          type="password"
        />
        <Link to="/carteira">
          <button
            disabled={ isButtonDisabled }
            onClick={ () => dispatchSaveEmail(email) }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(upDateCurrencies()),
  dispatchSaveEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchSaveEmail: PropTypes.func.isRequired,
};
