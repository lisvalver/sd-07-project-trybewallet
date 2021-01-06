import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handlerChange = this.handlerChange.bind(this);
    this.submitlogin = this.submitlogin.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handlerChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    const minLengthPassword = 6;
    const emailValidator = /\S+@\S+\.\S+/;
    if (emailValidator.test(email) && password.length >= minLengthPassword) return false;
    return true;
  }

  submitlogin(e) {
    e.preventDefault();
    const { email } = this.state;
    const { loginProps, history } = this.props;
    loginProps(email);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        <LoginForm
          submitlogin={ this.submitlogin }
          handlerChange={ this.handlerChange }
          validateEmailAndPassword={ this.validateEmailAndPassword }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

const mapDispatchToProps = (dispath) => ({
  loginProps: (email) => dispath(login(email)),
});

Login.propTypes = {
  loginProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
