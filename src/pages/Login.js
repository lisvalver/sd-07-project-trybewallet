import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';
import LoginBox from '../components/LoginBox';

class Login extends Component {
  constructor() {
    super();
    this.getInputs = this.getInputs.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
    this.state = {
      email: '',
      password: '',
      logged: false,
    };
  }

  onSubmitBtn() {
    const { email } = this.state;
    const { loginEmail } = this.props;
    loginEmail(email);
    this.setState({ logged: true });
  }

  getInputs({ target: { type, value } }) {
    this.setState({ [type]: value });
  }

  render() {
    const { password, email, logged } = this.state;
    return (
      logged ? <Redirect to="/carteira" /> : <LoginBox
        onSubmitBtn={ this.onSubmitBtn }
        getInputs={ this.getInputs }
        password={ password }
        email={ email }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (payload) => dispatch(login(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
};
