import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.enableDisable = this.enableDisable.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  buttonClick() {
    const { email, history } = this.props;
    history.push('/carteira');
    console.log(email);
  }

  enableDisable() {
    const { email, password } = this.state;
    console.log(password);
    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const seis = 6;
    const button = document.querySelector('button');
    button.disabled = !(regEx.test(email) && password.length > seis);
  }

  render() {
    const { email } = this.state;
    console.log(email);
    return (
      <div>
        <form>
          Login
          <label htmlFor="email">
            Email
            <input
              onChange={ ({ target }) => {
                this.setState({
                  email: target.value,
                }, this.enableDisable());
              } }
              className="email"
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              className="password"
              data-testid="password-input"
              minLength="6"
              type="password"
              name="password"
              id="password"
              onChange={ ({ target }) => {
                this.setState({
                  password: target.value,
                }, this.enableDisable());
              } }
            />
          </label>
          <button
            type="button"
            disabled="true"
            onClick={ () => this.buttonClick() }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
};
const mapDispatchToProps = {
  addUser,
};
export default connect(null, mapDispatchToProps)(Login);
