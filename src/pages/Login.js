import React from 'react';
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
    const { addEmail, email, history } = this.props;
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
            onChange={ ({ target }) => addEmail(target.value) }
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
const mapStateToProps = (state) => ({ //trouxe o rootReducer
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addEmail: (value) => dispatch(addEmail(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
