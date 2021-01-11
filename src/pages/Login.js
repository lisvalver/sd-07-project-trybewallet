import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../actions';
import { FormLogin } from '../components';

class Login extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleVerifyLogin = this.handleVerifyLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      submitDisabled: true,
    };
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      if (this.handleVerifyLogin(email, password)) {
        this.setState({ submitDisabled: false });
      } else {
        this.setState({ submitDisabled: true });
      }
    });
  }

  handleVerifyLogin(email, password) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passSize = 6;
    if (email.match(pattern) && password.length >= passSize) {
      return true;
    }
    return false;
  }

  handleSubmit() {
    const { logEmail, history } = this.props;
    const { email } = this.state;
    logEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, submitDisabled } = this.state;
    return (
      <FormLogin
        email={ email }
        password={ password }
        onInputChange={ this.handleInputChange }
        submitDisabled={ submitDisabled }
        handleSubmit={ this.handleSubmit }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logEmail: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
