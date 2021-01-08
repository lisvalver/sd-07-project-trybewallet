import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.validateInfos = this.validateInfos.bind(this);
    this.click = this.click.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  onChangeHandle({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateInfos() {
    const { email, password } = this.state;

    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const number = 6;
    return regex.test(email) && password.length >= number;
  }

  click() {
    const { loginDispatch, history } = this.props;
    const { email } = this.state;

    loginDispatch(email);
    history.push('/carteira');
  }

  render() {
    return (
      <div>
        Login

        <div>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Login"
              data-testid="email-input"
              onChange={ this.onChangeHandle }
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              data-testid="password-input"
              onChange={ this.onChangeHandle }
            />
          </label>
          <button
            type="button"
            disabled={ !this.validateInfos() }
            onClick={ this.click }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(emailUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loginDispatch: PropTypes.shape({}).isRequired,
};
