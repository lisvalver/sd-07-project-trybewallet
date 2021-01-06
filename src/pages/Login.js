import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from '../store'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { email, password } = this.state;
    let validPassword;
    const minLength = 6;
    const validEmail = email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    if (password.length >= 6) {
      validPassword = true;
    }
    if (validEmail && validPassword) {
      this.setState({ redirect: true});
      return;
    }
    alert('e-mail ou senha inválidos!');
  }

  render() {
    const { email, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/carteira" />
    }
    
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="e-mail"
          value={ email }
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="senha"
          value={ password }
          onChange={this.handleChange}
        />
        <button type="button" onClick={ this.handleClick }>Entrar</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
