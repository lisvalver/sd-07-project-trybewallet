import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';
import { login } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  validation() {
    const { email, password } = this.state;
    const passwordMaxLength = 6;
    const emailPattern = /\S+@\S+\.\S+/;
    if (emailPattern.test(email) && password.length >= passwordMaxLength) return false;
    return true;
  }

  submitLogin(e) {
    e.preventDefault();
    const { email } = this.state;
    const { loginProps, history } = this.props;
    loginProps(email);
    history.push('/carteira');
  }

  render() {
    return (
      <LoginForm
        submitLogin={ this.submitLogin }
        handleChange={ this.handleChange }
        validation={ this.validation }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  loginProps: (email) => dispatch(login(email)),
});

Login.propTypes = {
  loginProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
