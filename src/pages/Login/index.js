import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAction } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.changeValues = this.changeValues.bind(this);
    this.login = this.login.bind(this);
  }

  async changeValues({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
  }

  validEmail(email) {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(regexEmail);
  }

  login(event) {
    event.preventDefault();
    const { history, setUser } = this.props;
    const { email } = this.state;
    setUser(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const passLength = password.length;
    const five = 5;
    return (
      <div>
        <div>
          <form>
            <div>
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.changeValues }
              />
            </div>
            <div>
              Senha
              <input
                type="password"
                name="password"
                value={ password }
                data-testid="password-input"
                onChange={ this.changeValues }
              />
            </div>
            <button
              disabled={ this.validEmail(email) && passLength > five ? '' : 'disabled' }
              onClick={ this.login }
              type="button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispath) => ({
  setUser: (email) => dispath(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
