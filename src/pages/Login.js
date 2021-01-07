import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleLoginEvent = this.handleLoginEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      emailLogin: '',
      passwordLogin: '',
    };
  }

  emailRegexCheckerAndPasswordSize(email, password) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordSize = password;
    const minimumSize = 5;
    if (passwordSize.length <= minimumSize) {
      return false;
    }
    return regex.test(email);
  }

  handleLoginEvent(addingUser) {
    addingUser(this.state);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const { emailLogin, passwordLogin } = this.state;
    const { user, addUser } = this.props;

    if (user.email) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          value={ emailLogin }
          onChange={ (event) => this.handleChange('emailLogin', event.target.value) }
        />
        <input
          data-testid="password-input"
          minLength="6"
          value={ passwordLogin }
          onChange={ (event) => this.handleChange('passwordLogin', event.target.value) }
        />
        <button
          type="button"
          onClick={ () => addUser(emailLogin) }
          disabled={ !this.emailRegexCheckerAndPasswordSize(emailLogin, passwordLogin) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(login(email)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
