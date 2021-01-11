import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import emailOk from '../validation/emailValidation';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRouteEmail = this.handleRouteEmail.bind(this);

    this.state = {
      email: '',
      password: '',
      login: false,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleRouteEmail(email) {
    const { add } = this.props;

    this.setState({
      login: true,
    });

    add(email);
  }

  render() {
    const { email, password, login } = this.state;

    if (login) return <Redirect to="/carteira" />;

    return (
      <div className="pai">
        <header>Login</header>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="password"
          type="button"
          disabled={ emailOk(email, password) }
          onClick={ () => this.handleRouteEmail(email) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(addEmail(email)) });

Login.propTypes = {
  add: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
