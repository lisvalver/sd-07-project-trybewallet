import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import { signIn } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const entra = document.getElementById('btn-entra');
    entra.setAttribute('disabled', '');
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      const entra = document.getElementById('btn-entra');
      const minimo = 6;
      const regEmail = /.+@.+\.[A-Za-z]+$/;
      if (regEmail.test(email) && !(senha.length < minimo)) {
        entra.removeAttribute('disabled');
      } else {
        entra.setAttribute('disabled', '');
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, login } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div className="container">
        <div className="card">
          <img
            className="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="avatar"
          />
          <form>
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              placeholder="email"
              data-testid="email-input"
              onChange={ this.onInputChange }
              required
            />
            <input
              type="password"
              id="senha"
              value={ senha }
              name="senha"
              onChange={ this.onInputChange }
              placeholder="Senha"
              data-testid="password-input"
              required
            />
            <button
              id="btn-entra"
              className="btn"
              type="submit"
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
          <Link to="/">Esqueceu a senha?</Link>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.objectOf.isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(signIn(email)),
});
export default connect(null, mapDispatchToProps)(LoginForm);
