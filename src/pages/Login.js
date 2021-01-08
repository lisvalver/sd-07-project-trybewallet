import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEvent({target: {name, value}}) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveEmail, history } = this.props;
    saveEmail(this.state.email);

    history.push('/carteira');
  }
  render() {
    const {email, password} = this.state;
    return (
    <div>
      <form>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={email}
          onChange={this.handleEvent}
          placeholder="E-mail">
        </input>
        <input type="password" data-testid="password-input" placeholder="Senha"
        name="password"
        onChange={this.handleEvent}
        value={password}></input>
        <button type="button" onClick={this.handleClick}>Entrar</button>
      </form>
    </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

const mapDispatchToProps = {
  saveEmail: actions.saveEmail,
}


export default connect(null, mapDispatchToProps)(Login);
