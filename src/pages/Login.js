import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../actions';
import FormLogin from '../components/FormLogin';

class Login extends React.Component {
  constructor() {
    super();

    this.updateState = this.updateState.bind(this);
    this.loginAvaliator = this.loginAvaliator.bind(this);
    this.updateEmailGlobal = this.updateEmailGlobal.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
      redirect: false,
    };
  }

  updateState({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.loginAvaliator(),
    );
  }

  updateEmailGlobal() {
    const { updateEmail } = this.props;
    const { email } = this.state;
    this.setState(
      {
        redirect: true,
      },
      () => updateEmail(email),
    );
  }

  loginAvaliator() {
    const { email, password } = this.state;
    const minLength = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= minLength) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  }

  render() {
    const { buttonDisable, email, password, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <FormLogin
          email={ email }
          password={ password }
          update={ this.updateState }
        />
        <button
          type="button"
          disabled={ buttonDisable }
          onClick={ this.updateEmailGlobal }
        >
          Entrar
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  updateEmail: (value) => dispatch(getEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
};
