import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.isDisable = this.isDisable.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  isDisable() {
    const { email, password } = this.state;
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= SIX) {
      return false;
    }
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { history, saveEmail } = this.props;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ this.isDisable() }
          onClick={ () => saveEmail(email) && history.push('/carteira') }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (emailValue) => dispatch(addUserEmail(emailValue)),
});

export default connect(null, mapDispatchToProps)(Login);
