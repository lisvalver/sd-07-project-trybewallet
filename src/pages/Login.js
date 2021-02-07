import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmailUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      auth: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email);
  }

  handleChange({ target }) {
    const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z]{2,3})+$/i;
    const minPassword = 6;

    this.setState({ [target.id]: target.value }, () => {
      const { email, password } = this.state;
      const validation = regex.test(email) && password.length >= minPassword;
      this.setState({ auth: validation });
    });
  }

  render() {
    const { email, password, auth } = this.state;

    return (
      <div>
        <div>Login</div>
        <input
          id="email"
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          id="password"
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <Link to="/carteira">
          <button type="button" disabled={ !auth }>
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(addEmailUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};
