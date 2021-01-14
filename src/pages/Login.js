import React from 'react';
import { connect } from 'react-redux';
import { getLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginBtn: true,
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.loginValidation()
  }

  emailChecker() {
    const emailValue = this.state.email;
   
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    let emailCheck = false;
    if (emailValue.match(emailFormat)) {
      emailCheck = true;
    }
    return emailCheck;
  }

  passwordChecker() {
    const passwordValue = this.state.password;

    const passwordFormat = /.{5,}/;

    let passwordCheck = false;
    if (passwordValue.match(passwordFormat)) {
      passwordCheck = true;
    }
    return passwordCheck;
  }

  loginValidation() {
    const check1 = this.emailChecker();
    const check2 = this.passwordChecker();

    if (check1 && check2) {
      this.setState({ loginBtn: false },
      () => console.log(this.state.loginBtn));
    } else {
      this.setState({ loginBtn: true },
      () => console.log(this.state.loginBtn));
    }
  }

  loginBtn() {
    const { history, getLogin } = this.props;
    const { email, password } = this.state;
    
    getLogin(email, password);
    history.push('/carteira');
  }

  render() {
    return (
      <div className='login-container'>
        <h1>l o g i n</h1>
        <input
          type='email'
          name='email'
          id='email-input'
          data-testid='email-input'
          placeholder='e m a i l'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,}$'
          onChange={this.inputOnChange}
        ></input>
        <input
          type='password'
          name='password'
          id='password-input'
          data-testid='password-input'
          placeholder='p a s s wo r d'
          pattern='.{5,}' title='6 or more characters'
          onChange={this.inputOnChange}
        ></input>
        <button disabled={ this.state.loginBtn } onClick={() => this.loginBtn()}>Entrar</button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  getLogin: (email, password) => dispatch(getLogin(email, password))
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
