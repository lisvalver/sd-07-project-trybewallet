import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.state = {
      email: '',
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandle(e) {
    e.preventDefault();
    const { login } = this.props;
    const { email } = this.state;
    return login(email);
  }

  render() {
    return (
      <div>
        <h1>Página de Login</h1>
        <form onSubmit={this.submitHandle}>
          <label>
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Senha:
            <input
              data-testid="password-input"
              type="text"
              name="senha"
              minLength="6"
            />
          </label>
          <input type="submit" value="Entrar" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch({ type: 'LOGIN', payload: email }),
});

export default connect(null, mapDispatchToProps)(Login);
