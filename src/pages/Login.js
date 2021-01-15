import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.verification = this.verification.bind(this);
    this.changeEmailOrPassword = this.changeEmailOrPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: '',
      senha: '',
      redirect: false,
      disable: true,
    };
  }

  changeEmailOrPassword({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.verification();
    });
  }

  handleLogin() {
    const { setEmail } = this.props;
    const { email } = this.state;
    this.setState(
      {
        redirect: true,
      },
      () => setEmail(email),
    );
  }

  verification() {
    const { email, senha } = this.state;
    const minLenth = 6;
    if (
      email.includes('@')
      && email.includes('.com')
      && senha.length >= minLenth
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  render() {
    const { redirect, email, senha, disable } = this.state;
    return (
      <div>
        {!!redirect && <Redirect to="/carteira" />}

        <form>
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.changeEmailOrPassword }
          />

          <input
            data-testid="password-input"
            type="password"
            id="senha"
            name="senha"
            value={ senha }
            onChange={ this.changeEmailOrPassword }
          />
        </form>
        <button
          type="submit"
          disabled={ disable }
          onClick={ () => this.handleLogin() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch({ type: 'SET_EMAIL', payload: { email } }),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};
