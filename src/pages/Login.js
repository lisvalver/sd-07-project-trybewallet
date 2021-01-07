import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bulma-components';
import { login } from '../actions';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import '../index.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  verifyEmailAndPassword() {
    const { email, password } = this.state;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const passwordMinLength = 6;

    this.setState({ isDisabled: !(password.length >= passwordMinLength && emailFormat) });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.verifyEmailAndPassword();
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1 className="title is-2">WALLET APP</h1>
        <div className="columns is-desktop">
          <form onSubmit={ this.handleSignUp }>
            <input
              className="input is-success level-item"
              type="text"
              placeholder="E-mail"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
            <input
              className="input is-success level-item"
              type="password"
              placeholder="Password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <Button
              color="success"
              type="submit"
              disabled={ isDisabled }
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (emailUser) => dispatch(login(emailUser)),
});

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  sendEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
