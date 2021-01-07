import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../components';
import { signIn } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toValidateData = this.toValidateData.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      if (this.toValidateData(email, password)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleSubmit() {
    const { signInProps, history } = this.props;
    const { email } = this.state;
    signInProps(email);
    history.push('/carteira');
  }

  //  source https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  toValidateData(email, password) {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validEmail = reg.test(email);
    const miniLengthPassword = 6;
    const validPassword = password.length >= miniLengthPassword;

    if (validEmail && validPassword) {
      return true;
    }
    return false;
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <LoginForm
        formData={ this.state }
        onInputChange={ this.handleInputChange }
        onSubmit={ this.handleSubmit }
        buttonIsAble={ isDisabled }
      />
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  signInProps: (email) => dispatch(signIn(email)) });

export default connect(null, mapDispatchToProps)(Login);
