import React from 'react';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: false,
    }

    this.login = this.login.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  login = () => {
    this.props.history.push('/carteira')
    this.props.saveEmail(this.state.email)
  }

  isValid() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  let valid = true;
  if (valid && this.state.password.length < 5) {
      valid = false
  }
  if (valid && !this.state.email.match(regex)) {
      valid = false
  }
  this.setState({valid: valid})
}

  handleChange = (event, key) => {
    this.setState({
      [key]: event.target.value,
    });
    this.isValid();
  }

  render() {
    return (
      <div>
      <div>Login</div>
      <input data-testid="email-input" value={this.state.email} onChange={(event) => this.handleChange(event, 'email')}/>
      <input data-testid="password-input" value={this.state.password} onChange={(event) => this.handleChange(event, 'password')}/>
      <button
      onClick={this.login}
      disabled={!this.state.valid}
      >Entrar
      </button>
      <h1>{this.props.email}</h1>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEmail: email => {
      dispatch(actionCreators.saveEmail(email));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
