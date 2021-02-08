import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  /* validateInputs() {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    const validEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const validPassword = password.length >= passwordMinLength;
    if (validEmail && validPassword) {
      return this.setState({ button: false });
    }
  } */

  /* handleResetForm() {
    this.setState({
      email: '',
      password: '',
      button: true,
    });
  } */

  render() {
    const { email, addEmail, history } = this.props;
    const { password } = this.state;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const passwordMinLength = 6;
    return (
      <div>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Digite seu E-mail"
          value={ email }
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ ({ target }) => addEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={ password }
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ ({ target }) => this.setState({ password: target.value }) }
        />
        <button
          type="button"
          disabled={ !regexEmail.test(email) || password.length < passwordMinLength }
          onClick={ () => history.push('/carteira') }
        >
          ENTRAR
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDistpatchToProps = (dispatch) => ({
  addEmail: (emailValue) => dispatch(addEmail(emailValue)),
});

export default connect(mapStateToProps, mapDistpatchToProps)(LoginPage);
