import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user.action';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: '',
      passUser: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.callAction = this.callAction.bind(this);
  }

  callAction() {
    const { emailUser } = this.state;
    const { email } = this.props;
    email(emailUser);
  }

  handleChange(event) {
    event.preventDefault();
    const { target: { name }, target: { value } } = event;
    this.setState({
      [name]: value,
    });
  }

  isValid() {
    const { emailUser, passUser } = this.state;
    const minLengt = 6;
    return /\S+@\S+\.\S+/.test(emailUser) && passUser >= minLengt;
  }

  render() {
    return (
      <div className="container-form">
        <form>
          <div className="input-group">
            <input
              type="email"
              placeholder="E-mail"
              className="input"
              data-testid="email-input"
              name="emailUser"
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              className="input"
              data-testid="password-input"
              name="passUser"
              onChange={ this.handleChange }
            />
          </div>
          <span id="return-client" />
          <button
            type="button"
            className="btn-login"
            name="btn-login"
            disabled={ !this.isValid() }
            onClick={ this.callAction }
          >
            Entrar
          </button>
        </form>
        <a href="/" className="forgot-pass">Forgot password?</a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email(emailUser) {
    const action = login(emailUser);
    dispatch(action);
  },
});

export default connect(null, mapDispatchToProps)(Login);
