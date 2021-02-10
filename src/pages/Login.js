import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import emailToState from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      KeyCode: '',
      emailValue: false,
      keyCodeValue: false,
      DisableButton: true,
      newValue: false,
    };
    this.updateState = this.updateState.bind(this);
    this.loginRules = this.loginRules.bind(this);
    this.newValueUpdated = this.newValueUpdated.bind(this);
    this.btnLog = this.btnLog.bind(this);
  }

  componentDidUpdate() {
    const { email, KeyCode, newValue } = this.state;
    if (newValue) {
      this.loginRules(email, KeyCode);
      this.newValueUpdated();
    }
  }

  updateState(name, value) {
    this.setState({ [name]: value, newValue: true });
  }

  newValueUpdated() {
    this.setState({ newValue: false });
  }

  loginRules(email, KeyCode) {
    const emailIsValid = (/\S+@\S+\.\S+/);
    const passwordMinLenght = 6;
    if (KeyCode.length < passwordMinLenght) {
      this.setState({ keyCodeValue: false });
    }

    if (email.match(emailIsValid) && email !== '') {
      if (KeyCode.length >= passwordMinLenght) {
        this.setState({ DisableButton: false, keyCodeValue: false }); // email e password ok!(msg ñ) => libera btn
      } else {
        this.setState({ DisableButton: true, keyCodeValue: true });
      }
      this.setState({ emailValue: false });
    } else {
      this.setState({ DisableButton: true, emailValue: true });
    }
  }

  btnLog() {
    const { emailToStateDispatch } = this.props;
    const { email } = this.state;
    emailToStateDispatch(email, true);
  }

  render() {
    const { email, KeyCode, emailValue, keyCodeValue, DisableButton } = this.state;
    const { logState } = this.props;
    const emailFail = 'E-mail inválido ( Ex: abracadabra@gmail.com )';
    const passwordFail = 'A senha precisa ter no mínimo 6 caracteres';
    return (
      <div>
        { (logState) ? <Redirect push to="/carteira" /> : null }
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Login"
            value={ email }
            onChange={ ({ target }) => this.updateState(target.name, target.value) }
            required="required"
          />
          {(emailValue) ? <span>{emailFail}</span> : null}
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            value={ KeyCode }
            onChange={ ({ target }) => this.updateState(target.name, target.value) }
            required="required"
          />
          {(keyCodeValue) ? <span>{passwordFail}</span> : null}
          <button
            type="button"
            disabled={ DisableButton }
            onClick={ () => this.btnLog() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logState: state.user.log,
});

const mapDispatchToProps = (dispatch) => ({
  emailToStateDispatch: (email, log) => dispatch(emailToState(email, log)),
});

Login.propTypes = {
  logState: PropTypes.bool.isRequired,
  emailToStateDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
