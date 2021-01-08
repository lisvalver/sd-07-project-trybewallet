import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailValido: false,
      autentic: true,
    };

    this.validacaoEmail = this.validacaoEmail.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.changeEmailInTheStore = this.changeEmailInTheStore.bind(this);
  }

  validacaoEmail({ target }) {
    const { value } = target;
    this.setState({ email: value }, () => {
      const { email } = this.state;
      const validacaoByStackOf = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(validacaoByStackOf);
      if (matchEmail) {
        this.setState({ emailValido: true });
      } else {
        this.setState({ emailValido: false });
      }
    });
  }

  passwordValidation({ target }) {
    const { password, emailValido } = this.state;
    const noMagicNumber = 5;

    this.setState({ password: target.value });
    if (password.length >= noMagicNumber && emailValido === true) {
      this.setState({ autentic: false });
    } else { this.setState({ autentic: true }); }
  }

  changeEmailInTheStore() {
    const { currentLogin } = this.props;
    const { email } = this.state;

    currentLogin(email);
  }

  render() {
    const { autentic } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.validacaoEmail(event) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => this.passwordValidation(event) }
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ autentic }
              onClick={ () => this.changeEmailInTheStore() }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  currentLogin: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currentLogin: (user) => dispatch(currentLogin(user)),
});

export default connect(null, mapDispatchToProps)(Login);
