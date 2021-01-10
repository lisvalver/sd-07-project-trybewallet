import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      auth: false,
    };
    this.validateInfos = this.validadeInfos.bind(this);
    this.click = this.click.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validadeInfos() {
    const { email, password } = this.state;
    const regex = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    const minPassword = 5;
    const validation = regex.test(email) && password.length >= minPassword;
    this.setState({
      auth: validation,
    });
  }

  click() {
    const { email } = this.state;
    const { addEmail } = this.pros;
    addEmail(email);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.validadeInfos();
  }

  render() {
    const { auth } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="email">
            E-mail
            <input
              onChange={ (e) => this.handleChange(e) }
              id="email"
              type="email"
              placeholder="Login"
              data-testid="email-input"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              onChange={ (e) => this.handleChange(e) }
              id="password"
              type="password"
              placeholder="Passrword"
              data-testid="password-input"
            />
          </label>
          <Link to="/carteira">
            <button onClick={ this.click } type="button" disabled={ !auth }>
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(emailUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
