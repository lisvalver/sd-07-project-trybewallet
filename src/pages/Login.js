import React from 'react';
import { connect } from 'react-redux';
import { saveUserEmail } from '../actions';

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this);
    this.verifyData = this.verifyData.bind(this);

    this.state = {
      email: '',
      password: '',
      verifiedEmail: false,
      verifiedPassword: false,
    }
  }


  verifyData = (name, value) => {
    
    switch(name) {
      case 'email':
        const emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i)
        emailIsValid ? this.setState({ verifiedEmail: true}) : this.setState({verifiedEmail: false})
        return;     
      case 'password':
        value.length >= 6 ? this.setState({ verifiedPassword: true }) : this.setState({ verifiedPassword: false })
        return;
      default:
        break;
    }
    
    
    
  }
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    this.verifyData(name, value);
  }

  handleClick = () => {
    const { email } = this.state
    const { history } = this.props;
    this.props.saveEmail(email);

    history.push('/carteira')

  }

  render() {
    const { email, password, verifiedEmail, verifiedPassword } = this.state
    return (
      <div>
        <h1>Login Page</h1>
        <form>
          <label>
            Email:
            <input
              value={email}
              name='email'
              onChange={this.handleOnChange}
              data-testid='email-input'
              type='text'
            />
          </label>
          <br/>
          <label>
            Senha:
            <input
              value={password}
              name='password'
              onChange={this.handleOnChange} 
              data-testid='password-input'
              type='text'
            />
          </label>
        </form>
        <button disabled={ verifiedEmail && verifiedPassword ? false : true } onClick={this.handleClick}>Entrar</button>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveUserEmail(email))
})

export default connect(null, mapDispatchToProps)(Login);
