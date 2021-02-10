import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { salveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: '',
      password: '',
    };
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton();
  }

  enableButton() {
    const { email, password } = this.state;
    const regexForEmail = /\S+@\S+\.\S+/;
    const length = 5;
    const passwordIsValid = password.length >= length;
    const emailIsValid = regexForEmail.test(email);
    if (passwordIsValid && emailIsValid === true) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  redirect(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { disabled, email, password } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          disabled={ disabled }
          onClick={ this.redirect }
        >
          Entrar

        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (e) => dispatch(salveEmail(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchEmail: PropTypes.func.isRequired,
};
