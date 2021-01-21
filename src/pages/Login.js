import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
    };

    this.emailAndPasswordValidation = this.emailAndPasswordValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.takeToTheWallet = this.takeToTheWallet.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  emailAndPasswordValidation() {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const minPassLength = 6;
    const { email, password } = this.state;
    const verification = regex.test(email);
    if (verification && password.length >= minPassLength) {
      return false;
    }
    return true;
  }

  takeToTheWallet() {
    const { getEmailAction } = this.props;
    const { email } = this.state;
    getEmailAction(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email">
            <span>E-mail</span>
            <input
              type="email"
              data-testid="email-input"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            onClick={ () => this.takeToTheWallet() }
            disabled={ this.emailAndPasswordValidation() }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmailAction: (email) => (dispatch(getEmail(email))),
});

Login.propTypes = {
  getEmailAction: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
