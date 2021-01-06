import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      email: '',
    };
  }

  buttonClick() {
    const { email, history } = this.props;
    history.push('/carteira');
    console.log(email);
  }

  render() {
    const { email } = this.state;
    console.log(email);
    return (
      <div>
        <form>
          Login
          <label htmlFor="email">
            Email
            <input
              onChange={ ({ target }) => this.setState({ email: target.value }) }
              className="email"
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              className="password"
              data-testid="password-input"
              minLength="6"
              type="password"
              name="password"
              id="password"
            />
          </label>

          <button type="button" onClick={ () => this.buttonClick() }>Entrar</button>
        </form>
      </div>);
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
};
const mapDispatchToProps = {
  addUser,
};
export default connect(null, mapDispatchToProps)(Login);
