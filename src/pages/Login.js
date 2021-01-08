import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.state = {
      email: '',
      emailValidate: false,
      senhaValidate: false,
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandle(e) {
    e.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  checkFields(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      const patt = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const result = patt.test(value);
      this.setState({ emailValidate: result });
    }

    if (name === 'senha') {
      const patt = 6;
      const result = value.length >= patt;
      this.setState({ senhaValidate: result });
    }
  }

  render() {
    const { emailValidate, senhaValidate } = this.state;

    return (
      <div>
        <h1>Página de Login</h1>
        <form onSubmit={ this.submitHandle } onChange={ this.checkFields }>
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              data-testid="password-input"
              id="senha"
              type="text"
              name="senha"
              minLength="6"
            />
          </label>
          <input
            type="submit"
            value="Entrar"
            disabled={ !(emailValidate && senhaValidate) }
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(actions.loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
