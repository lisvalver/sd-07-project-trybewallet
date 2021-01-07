import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginField from './components/LoginField';
import * as actions from '../store/ducks/user/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.validateDatabase = this.validateDatabase.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChanges({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateDatabase() {
    const { email, password } = this.state;
    const minNumber = 5;
    const requiredPassword = password.length > minNumber && password !== '';

    const expectedPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const requiredEmail = expectedPattern.test(email) && email !== '';
    console.log(requiredEmail);
    console.log(requiredPassword);
    return requiredPassword && requiredEmail;
  }

  handleClick() {
    const { saveEmail, history } = this.props;
    const { email } = this.state;

    history.push('./carteira');
    saveEmail(email);
  }

  render() {
    return (
      <form className="form">
        <span>TRYBE</span>
        <LoginField
          userData={ this.state }
          handlerChanges={ this.handleChanges }
          validation={ this.validateDatabase }
          handlerClick={ this.handleClick }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.email,
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, actions)(Login);
