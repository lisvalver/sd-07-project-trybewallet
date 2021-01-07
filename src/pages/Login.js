import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

  render() {
    const { email, password, validate } = this.state;
    const { saveEmail } = this.props;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          maxLength="40"
          placeholder="Email"
          value={ email }
          name="email"
          onChange={ (e) => this.handleChanger(e) }
        />

        <input
          type="text"
          data-testid="password-input"
          maxLength="50"
          placeholder="password"
          value={ password }
          name="password"
          onChange={ (e) => this.handleChanger(e) }
        />
        <Link to="/carteira">
          <button type="button" onClick={ () => saveEmail(email) } disabled={ validate }>
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
