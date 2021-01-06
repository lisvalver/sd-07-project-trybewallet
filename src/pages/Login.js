import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLoginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.verifyInput());
  }

  // Email verification: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  verifyInput() {
    const { email, password } = this.state;
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const num = 5;
    if (regEx.test(email) && password.length > num) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  render() {
    const { disableButton, email } = this.state;
    const { addLogin } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disableButton }
            onClick={ () => addLogin(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLogin: (email) => dispatch(addLoginAction(email)),
});

Login.propTypes = {
  addLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
