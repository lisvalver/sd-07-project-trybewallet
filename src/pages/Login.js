import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  verifyInput() {
    const { email, password } = this.state;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const SIX = 6;
    const validPassword = password.length >= SIX;

    return validEmail && validPassword;
  }

  handleChange({target}) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const isValid = this.verifyInput();
      this.setState({ isValid });
    });
  }

  handleClick() {
    const { handleLogin } = this.props;
    const { email } = this.state;

    handleLogin(email);
  }

  render() {
    const { email, password, isValid } = this.state;
    const { validLogin } = this.props;

    if (validLogin) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="alguem@alguem.com"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            required
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  validLogin: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
