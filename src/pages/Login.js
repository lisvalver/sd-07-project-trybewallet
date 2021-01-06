import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import addEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validateEmail);
  }

  validateEmail() {
    const magicNumber = 5;
    const { email, password } = this.state;
    if (email.match(/\S+@\S+\.\S+/) && password.length > magicNumber) {
      return this.setState({ validate: false });
    }
    this.setState({ validate: true });
  }

  render() {
    const { email, password, validate } = this.state;
    const { saveEmail } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          onChange={ (e) => this.handleChanger(e) }
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          placeholder="senha"
          onChange={ (e) => this.handleChanger(e) }
        />
        <Link to="/carteira">
          <input
            type="button"
            value="Entrar"
            disabled={ validate }
            src="/carteira"
            onClick={ () => saveEmail(email) }
          />
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.shape({
    saveEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
