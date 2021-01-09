import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import emailOk from '../helpers/emailValidation';
import { addClick } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.pathWallet = this.pathWallet.bind(this);

    this.state = {
      email: '',
      password: '',
      login: false,
    };
  }

  pathWallet(email) {
    const { add } = this.props;
    this.setState({ login: true });
    add(email);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handleChangePassword(event) {
  //   this.setState({ password: event.target.value });
  // }

  render() {
    const { email, password, login } = this.state;
    if (login) return <Redirect to="/carteira" />;
    return (
      <div className="pai">
        <header>Login</header>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          className="button-send"
          data-testid="password"
          disabled={ emailOk(email, password) }
          type="button"
          onClick={ () => this.pathWallet(email) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    add: (email) => dispatch(addClick(email)),
  });

export default connect(null, mapDispatchToProps)(Login);
