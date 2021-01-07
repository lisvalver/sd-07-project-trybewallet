import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      authLogin: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.validationInput = this.validationInput.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationInput);
  }

  validationInput() {
    const regxVal = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
    const minSize = 5;
    const { email, senha } = this.state;
    if (Boolean(regxVal.test(email)) && senha.length > minSize) {
      this.setState({ authLogin: false });
    } else {
      this.setState({ authLogin: true });
    }
  }

  render() {
    const { email, senha, authLogin } = this.state;
    const { setEmail: setEmailProp } = this.props;
    return (
      <div>
        <form action="">
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleInput }
          />
          <input
            type="password"
            data-testid="password-input"
            name="senha"
            value={ senha }
            onChange={ this.handleInput }
          />
          <Link to="/carteira">
            <button
              disabled={ authLogin }
              type="button"
              onClick={ () => setEmailProp(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispathToProps = {
  setEmail,
};

export default connect(null, mapDispathToProps)(Login);
// export default Login;
Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};
