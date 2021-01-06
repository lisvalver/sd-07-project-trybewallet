import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      auth: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange({ target }) {
    const { value } = target;
    this.setState({ email: value }, () => {
      const { email } = this.state;
      const regexpEMAIL = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
      const matchEmail = email.match(regexpEMAIL);
      if (matchEmail) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }

  handlePasswordChange({ target }) {
    const { value } = target;
    this.setState({ password: value });
  }

  render() {
    const { auth, email, password } = this.state;
    const { logando, logado } = this.props;
    const numberSix = 6;

    if (logado) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <input
          data-testid="email-input"
          onChange={ (event) => this.handleEmailChange(event) }
        />
        <input
          data-testid="password-input"
          onChange={ (event) => this.handlePasswordChange(event) }
        />
        <button
          disabled={ !auth || password.length < numberSix }
          type="button"
          onClick={ () => logando(email) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logando: (email) => dispatch(login(email)),
});

const mapStateToProps = (state) => ({
  logado: state.user.login,
});

Login.propTypes = {
  logando: PropTypes.func.isRequired,
  logado: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
