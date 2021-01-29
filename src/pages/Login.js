import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Source: https://ui.dev/validate-email-address-javascript/
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const five = 5;
      if (this.emailIsValid(email) && password.length > five) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  }

  handleClick() {
    const { userLogin, history } = this.props;
    const { email } = this.state;
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disable } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ disable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispacthToProps = (dispatch) => ({
  userLogin: (email) => dispatch(emailLogin(email)),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(null, mapDispacthToProps)(Login);
