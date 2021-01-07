import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.validadeEmail = this.validadeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validadeEmail);
  }
  validadeEmail() {
    const { email, password } = this.state;
    const number = 5;
    if (email.match(/\S+@\S+\.\S+/) && password.length > number) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }

  handleSubmit() {
    const { saveEmail, history } = this.props;
    saveEmail(this.state.email);
    history.push('/carteira');
  }

  render() {
    const { email, password, validate } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          maxLength="40"
          placeholder="Email"
          required
          value={ email }
          name="email"
          onChange={(e) => this.handleChanger(e)}
        />

        <input
          type="text"
          data-testid="password-input"
          maxLength="50"
          placeholder="password"
          value={ password }
          name="password"
          onChange={(e) => this.handleChanger(e)}
        />
        <button onClick={() => this.handleSubmit()} disabled={ validate }>
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
