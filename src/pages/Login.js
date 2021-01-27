import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
    };
  }

  render() {
    const { addemail, email, history } = this.props;
    const { password } = this.state;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const minLength = 6;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="email-input"
            id="name"
            type="text"
            value={ email }
            name="name"
            onChange={ ({ target }) => addemail(target.value) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => this.setState({ password: target.value }) }
          />
        </label>
        <button
          type="button"
          disabled={ !regexEmail.test(email) || password.length < minLength }
          onClick={ () => history.push('/carteira') }
        >
          Entrar
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addemail: (value) => dispatch(addEmail(value)),
});

Login.propTypes = {
  addemail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
