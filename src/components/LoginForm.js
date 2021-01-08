import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userInfoAction } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.validateLoginInfo = this.validateLoginInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateLoginInfo() {
    const { email, password } = this.state;
    const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const PasswordMinLength = 6;
    return regEmail.test(email) && password.length >= PasswordMinLength;
  }

  handleClick() {
    const { emailDispatch, history } = this.props;
    const { email } = this.state;
    emailDispatch(email);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="email"
            placeholder="Email"
            required="required"
            data-testid="email-input"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
          <input
            type="password"
            placeholder="Password"
            required="required"
            data-testid="password-input"
            minLength="6"
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />
          <button
            type="submit"
            disabled={ !this.validateLoginInfo() }
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(userInfoAction(email)),
});

LoginForm.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
