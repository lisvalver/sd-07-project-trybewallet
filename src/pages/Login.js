import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.enableDisable = this.enableDisable.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { email, password } = this.state;
    console.log(email, password);
    this.enableDisable();
  }

  enableDisable() {
    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const seis = 6;
    const button = document.querySelector('button');
    const campoEmail = document.getElementById('email').value;
    const campoPassword = document.getElementById('password').value;
    button.disabled = !(regEx.test(campoEmail) && campoPassword.length >= seis);
  }

  buttonClick() {
    console.log('entrou no click');
    const { history, logar } = this.props;
    const { email } = this.state;
    logar(email);
    history.push('/carteira');
  }

  render() {
    const { email } = this.state;
    console.log(email);
    return (
      <div>
        <form>
          Login
          {' '}
          <br />
          <label htmlFor="email">
            Email
            <input
              onChange={ ({ target }) => {
                this.setState({
                  email: target.value,
                }, this.enableDisable());
              } }
              className="email"
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
            />
          </label>
          {' '}
          <br />
          <label htmlFor="password">
            Senha
            <input
              className="password"
              data-testid="password-input"
              minLength="6"
              type="password"
              name="password"
              id="password"
              onChange={ ({ target }) => {
                this.setState({
                  password: target.value,
                }, this.enableDisable());
              } }
            />
          </label>
          <button
            type="button"
            onClick={ () => {
              this.buttonClick();
            } }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}
Login.propTypes = {
  history: PropTypes.shape().isRequired,
  logar: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({ // só inclui funções
  logar: (email) => dispatch(addUser(email)),
});

// const mapDispatchToProps = {
//   addUser,
// }

// const mapStateToProps = (state) => ({
//   email: state.user.email
// })
export default connect(null, mapDispatchToProps)(Login);

// function one (numero) {
//   const resultado = numero +1
//   return resultado;
// }

// function one1 (numero) {
//   return numero +1
// }

// const one2 = (numero) =>  {
//   return numero +1
// }

// const one3 = (numero) => ({numero +1});
