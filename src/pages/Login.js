import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  validatePassword() {
    const { password } = this.state;
    const minLength = 6;
    if (password.length >= minLength) return true;
    return false;
  }

  enableButton() {
    if (this.validateEmail() && this.validatePassword()) {
      this.setState({
        buttonDisabled: false,
      });
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.enableButton();
    });
  }

  sendUser(event) {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    addUser(email);
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <form>
          <input
            type="text"
            data-testid="email-input"
            name="email"
            placeholder="Enter your email"
            onChange={ this.handleChange }
          />
          <br />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="Enter your password"
            onChange={ this.handleChange }
          />
          <br />
          <button
            type="button"
            id="button-enter"
            disabled={ buttonDisabled }
            onClick={ this.sendUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
