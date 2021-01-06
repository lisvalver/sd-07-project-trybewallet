import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginForm, LoginHeader } from '../components';
import { signIn } from '../store/ducks/user';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validadeEmail = this.validadeEmail.bind(this);
    this.validadePassword = this.validadePassword.bind(this);
  }

  validadeEmail(email) {
    const mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(mailformat)) return true;
    return false;
  }

  validadePassword(password) {
    const MIN_LEGNTH = 6;
    if (password.length >= MIN_LEGNTH) return true;
    return false;
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      if (this.validadeEmail(email) && this.validadePassword(password)) {
        this.setState({ disabledButton: false });
      } else {
        this.setState({ disabledButton: true });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { signIn: logIn, history } = this.props;
    const { email, password } = this.state;
    const user = { email, password };
    logIn(user);
    history.push('/carteira');
  }

  render() {
    const { disabledButton } = this.state;
    const styleGrid = {
      height: '100vh',
    };
    const styleColumn = {
      maxWidth: '450px',
    };
    return (
      <div
        style={ styleGrid }
        className="ui center aligned middle aligned grid"
      >
        <div
          style={ styleColumn }
          className="column"
        >
          <LoginHeader message="Trybe Wallet" />
          <LoginForm
            formData={ this.state }
            onInputChange={ this.handleInputChange }
            onSubmit={ this.handleSubmit }
            disabled={ disabledButton }
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(Login);
