import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, validator } from '../actions';
import { LoginBox } from '../components';

class Login extends Component {
  constructor() {
    super();
    this.getChanges = this.getChanges.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
    this.state = {
      email: '',
      password: '',
      logged: false,
    };
  }

  componentDidUpdate(_, prevState) {
    this.valideChanges(prevState);
  }

  onSubmitBtn() {
    const { email } = this.state;
    const { loginEmail } = this.props;
    loginEmail(email);
    this.setState({ logged: true });
  }

  getChanges({ target: { type, value } }) {
    this.setState({ [type]: value });
  }

  valideChanges({ email: e, password: p }) {
    const { email, password } = this.state;
    if (email !== e || password !== p) {
      const { validate } = this.props;
      validate(email, password);
    }
  }

  render() {
    const { logged } = this.state;
    return (
      logged ? <Redirect to="/carteira" /> : <LoginBox
        onSubmitBtn={ this.onSubmitBtn }
        getChanges={ this.getChanges }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (payload) => dispatch(login(payload)),
  validate: (email, password) => dispatch(
    validator(email, password),
  ),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
};
