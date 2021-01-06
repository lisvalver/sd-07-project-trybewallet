import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', disabled: true };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.disableButton.bind(this);
  }

  componentDidUpdate() {
    const { email, password, disabled } = this.state;
    const re = /\S+@\S+\.\S+/;
    const leng = 5;
    if (re.test(email) && password.length > leng && disabled) {
      this.disableButton(false);
    } else if (!disabled) {
      if (!re.test(email) || !(password.length > leng)) {
        this.disableButton(true);
      }
    }
  }

  disableButton(bool) {
    this.setState({ disabled: bool });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { email } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(email);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          type="password"
          minLength="6"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ () => this.handleClick() }
          disabled={ disabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(login(email)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
