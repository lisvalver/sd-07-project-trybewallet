import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/user.action';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: '',
      passUser: '',
      btn: true,
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

  isValid() {
    const { emailUser, passUser } = this.state;
    const minLengt = 5;
    const result = /\S+@\S+\.\S+/.test(emailUser) && passUser.length >= minLengt;
    this.setState({ btn: !result });
  }

  handleChange(event) {
    event.preventDefault();
    const { target: { name }, target: { value } } = event;
    this.setState({
      [name]: value,
    });
    this.isValid();
  }

  render() {
    const { btn, emailUser, passUser } = this.state;
    const { user } = this.props;

    if (user.email) {
      return <Redirect to="/carteira" />;
    }
    console.log(window.location.pathname);
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
              value={ emailUser }
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
              value={ passUser }
            />
          </div>
          <span id="return-client" />
          <button
            type="button"
            className="btn-login"
            name="btn-login"
            disabled={ btn }
            onClick={ this.callAction }
            data-testid="button-login"
          >
            Entrar
          </button>
        </form>
        <a href="/forgot" className="forgot-pass">Forgot password?</a>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  email(emailUser) {
    const action = login(emailUser);
    dispatch(action);
  },
});

Login.propTypes = {
  email: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
