import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { email } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.change = this.change.bind(this);
    this.state = {
      password: '',
    };
  }

  async change(event) {
    await this.setState({ password: event.target.value });
  }

  render() {
    const { emailS, addemail } = this.props;
    const { password } = this.state;
    const number = 6;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            value={ emailS }
            onChange={ (event) => addemail(event.target.value) }
          />
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ (event) => this.change(event) }
          />
        </form>
        <button
          disabled={ !regexEmail.test(emailS) || password.length < number }
          type="button"
        >
          <Link to="/carteira">Entrar</Link>
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  addemail: PropTypes.functio().isRequired,
  emailS: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailS: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addemail: (emailtext) => dispatch(email(emailtext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
