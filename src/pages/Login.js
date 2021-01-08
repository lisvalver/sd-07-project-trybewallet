import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
  }

  emailIsValid() {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const minLengt = 6;
    return re.test(email) && password.length >= minLengt;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Login
            <input
              value={ email }
              data-testid="email-input"
              type="text"
              onClick={ this.handleChange }
              placeholder="email"
              name="email"
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              value={ password }
              data-testid="password-input"
              type="password"
              placeholder="senha"
              minLength="6"
              name="senha"
            />
          </label>
          <button
            type="submit"
            disabled={ false }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(Login);
