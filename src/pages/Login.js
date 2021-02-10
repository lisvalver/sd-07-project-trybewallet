import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions/index';

// Retirei o Constructor do colega Pedro por não lembrar a sua utilização.
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validateAcess = this.validateAcess.bind(this);
    this.state = {
      email: '',
      password: '',
      itsOk: true,
    };
  }

  validateAcess() {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { email, password } = this.state;
    const result = re.test(email);
    const maxChar = 6;
    if (result && password.length >= maxChar) return this.setState({ itsOk: false });
    this.setState({ itsOk: true });
  }

  render() {
    const { email, password, itsOk } = this.state;
    const { addEmail, history } = this.props;
    return (
      <div>
        <form>
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
              onKeyUp={ this.validateAcess }
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
              onKeyUp={ this.validateAcess }
              required
            />
          </label>
          <button
            type="button"
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

const { userAction } = actions;
const mapDispatchToProps = (dispatch) => ({
  addEmail: (e) => dispatch(userAction(e)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
