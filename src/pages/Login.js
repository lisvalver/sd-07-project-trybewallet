import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loginBtnStatus: true,
      password: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidUpdate(_previousState, newState) {
    const { email, password } = this.state;
    if (newState.email !== email || newState.password !== password) {
      this.onChangeHandler();
    }
  }

  onChangeHandler() {
    const { email, password } = this.state;
    const regTest = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
    const minPassLength = 6;
    this.setState({ loginBtnStatus: !(regTest && password.length >= minPassLength) });
  }

  render() {
    const { email, password, loginBtnStatus } = this.state;
    const { history, userLogin } = this.props;
    return (
      <div>
        <input
          onChange={ (e) => this.setState({ email: e.target.value }) }
          type="text"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
        />
        <input
          onChange={ (e) => this.setState({ password: e.target.value }) }
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
        />
        <button
          disabled={ loginBtnStatus }
          type="submit"
          onClick={ () => {
            userLogin(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin: loginAction,
};

Login.propTypes = {
  actionLoginProp: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
