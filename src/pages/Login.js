import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      itsOk: true,
    };
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail() {
    const { email, password } = this.state;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const result = regexEmail.test(email);
    const maxVal = 6;
    if (result && password.length >= maxVal) return this.setState({ itsOk: false });
    this.setState({ itsOk: true });
  }

  render() {
    const { email, password, itsOk } = this.state;
    const { addEmail, history } = this.props;
    return (
      <div>
        <form id="formLogin">
          <label htmlFor="email">
            Email
            <input
              type="email"
              data-testid="email-input"
              id="email"
              value={ email }
              placeholder="Digite seu email"
              onChange={ ({ target }) => {
                this.setState({ email: target.value });
              } }
              onKeyUp={ this.validateEmail }
              required
            />
          </label>
          <label htmlFor="Password">
            Senha
            <input
              type="password"
              data-testid="password-input"
              id="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ async ({ target }) => {
                await this.setState({ password: target.value });
              } }
              onKeyUp={ this.validateEmail }
              required
            />
          </label>
          <button
            type="button"
            id="buttonEnter"
            onClick={ () => {
              addEmail(email);
              history.push('/carteira');
            } }
            disabled={ itsOk }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addEmail: (e) => dispatch(userAction(e)),
});

// Login.propTypes = {
//   addEmail: PropTypes.func.isRequired,
//   history: PropTypes.objectOf().isRequired,
// };

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
