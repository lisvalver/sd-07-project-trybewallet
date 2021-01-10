import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.verifyData = this.verifyData.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      verifiedEmail: false,
      verifiedPassword: false,
    };
  }

  verifyData(name, value) {
    const six = 6;
    const emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const passwordIsValid = value.length >= six;

    if (name === 'email') {
      this.setState({ verifiedEmail: emailIsValid });
    }

    if (name === 'password') {
      this.setState({ verifiedPassword: passwordIsValid });
    }
  }

  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.verifyData(name, value);
  }

  handleClick() {
    const { email } = this.state;
    const { history, saveEmail } = this.props;
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, verifiedEmail, verifiedPassword } = this.state;
    const bothValid = verifiedEmail && verifiedPassword;
    return (
      <div>
        <h1>Login Page</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              value={ email }
              name="email"
              onChange={ this.handleOnChange }
              data-testid="email-input"
              type="text"
            />
          </label>
          <br />
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              value={ password }
              name="password"
              onChange={ this.handleOnChange }
              data-testid="password-input"
              type="text"
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ !bothValid }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveUserEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
